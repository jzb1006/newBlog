// const crypto=require('crypto');
// var obj=crypto.createHash('md5');
// obj.update('123456'+'sdf09809809sdf34$#%%^&%^&234');
// console.log(obj.digest('hex'));
const common=require('./libs/commont');
var pass=common.md5('123456'+common.MD5_SUFFIX);
