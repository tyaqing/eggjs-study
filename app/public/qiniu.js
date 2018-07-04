
'use strict';
const qiniu = require('qiniu');


const mac = new qiniu.auth.digest.Mac('vjwba6lt3Bf9uQeOgD-7Tra2sIUyNcoW52vsRJrB', '8_62AzEIg2MxRxUDT3iIPF_Gm2mlAU3MWl-pmcgo');
const options = {
  scope: 'xsbapp',
};
const putPolicy = new qiniu.rs.PutPolicy(options);

// p71vs8p5s.bkt.clouddn.com


// 文件上传
function upload(readableStream) {
  return new Promise(function(resolve, reject) {
    const uploadToken = putPolicy.uploadToken(mac);
    const config = new qiniu.conf.Config();

    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    formUploader.putStream(uploadToken, null, readableStream, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode === 200) {
        // console.log(respInfo);
        resolve(respBody);
      } else {
        reject(respInfo);
        console.log(123);
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  });

}


module.exports = upload;
