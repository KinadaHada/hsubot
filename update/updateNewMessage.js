const { debug, admin, BOT_TOKEN, BOT_API } = require('../config.js');
const { plugins } = require('../module/plugins');
const helper = require('../module/helper');
const { Util } = require('../module/util');
const APP = require('../app.js');
require('console-stamp')(console, 'HH:MM:ss.l');

let userbot_id = false

if (BOT_API) {
    let split = BOT_TOKEN.split(':')
    if (split.length < 2) {
        console.log('❌ TOKEN BOT Keliru!')
        process.exit(1)
    }
    userbot_id = split[0]
}

module.exports = function (tg, update) {
    if (!userbot_id)
        if (!BOT_API) {
            if (debug.active) console.log('🔖 FYI, userbot_id belum dapet - tidak perlu khawatir.')
            tg.getMe().then(result => userbot_id = result.id)
        }

    let message = update.message

    if (message.sender.user_id == userbot_id) {
        // tulis coding di sini jika pengen diproses
        // console.log('Pesan sendiri tidak diproses.')
        return false
    }

    if (admin.active)
        if (!Util.punyaAkses(admin.id, message.sender.user_id))
            return debug.active ? console.log('❌ Dia tidak ada akses', message.sender.user_id) : false

    if (!message.content) return false
    let content = message.content


    // deteksi event TEKS saja dulu

    if (!content.text) return false
    if (!content.text.text) return false

    let ketemu = false

    plugins.forEach(plugin => {
        if (!plugin.status) return false
        if (ketemu) return true
        let result = plugin.run(tg, update)
        if (result) {
            ketemu = true
            if (debug.active) console.log('-> 🥅 Terdeteksi:', { name: plugin.name, regex: plugin.regex })
        }
    })

    // modul helper
    if (!ketemu) {
        Util.forEach(helper, help => {
            help.run(tg, update, plugins)
        })
    }

}