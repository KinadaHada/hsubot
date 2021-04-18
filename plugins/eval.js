let eval = {
    name: 'evals',
    status: true,
    clue: ['Fungsi: evaluator', 'Format:\n <code>.eval [code untuk dieksekusi]</code>'],
    regex: /^([!\/\.]evals)$/i,
    run: async function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
          var evals = this.regex.exec(text)
          var evals2 = text.replace(evals[1], "")
          try {
			await eval(`(async ()=>{ ${evals2} })()`);
		} catch (err) {
			tg.sendMessage(message.chat_id, String(err));
		}
        }
    }
}

module.exports = {
eval
}
