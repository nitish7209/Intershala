require("dotenv").config({ path: "./.env" });
const ImageKit = require("imagekit")

exports.initImageKit = function () {
  var imagekits = new ImageKit({
    publicKey: process.env.PUBLICKEY_IMAGEKIT,
    privateKey: process.env.PRIVATEKEY_IMAGEKIT,
    urlEndpoint: process.env.ENDPOINTURL_IMAGEKIT,
  });

  return imagekits;
};
