function toBool(situasi){
var obj = situasi.toLowerCase().trim();
   switch(obj){
     case "true":
       obj = true
     break;
     case "false":
       obj = false
     break;
     case "on":
       obj = true
     break;
     case "off":
       obj = false
     break;
     default:
       obj = false
     break;
  }
  return obj
}

module.exports = {
  // di dapat dari https://my.telegram.org/
  API_ID: Number(process.env.api_id),
  API_HASH: String(process.env.api_hash) ,
  pathTDLib : './tdlib/libtdjson.so',

  // aktifkan jika pakai bot API
  BOT_API: toBool(String(process.env.bot_api)),
  // HANYA jika BOT_API true, token bot API dari @botfather
  BOT_TOKEN: String(process.env.bot_token),

  // untuk verbose mode
  debug: {
    active: toBool(String(process.env.debug_mode)),
    level: Number(process.env.debug_level)|1 // 1 event only, 2 detail, 3 semua termasuk object dan fungsi
  },
  admin:
  {
    active: toBool(String(process.env.admin_mode)),
    // Jika admin.active, sesuaikan dengan ID mu
    id: [Number(process.env.admin_id)|"OWNER_ID"],
  },


}
