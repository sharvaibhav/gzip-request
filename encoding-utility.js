const zlib = require("zlib");

// Function to compress and encode data
async function compressAndEncodeFunc(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, compressedData) => {
      if (err) {
        reject(err);
      } else {
        const base64Encoded = compressedData.toString("base64");
        resolve(base64Encoded);
      }
    });
  });
}

module.exports = function (jsonData) {
  return { compressAndEncode: compressAndEncodeFunc };
};
