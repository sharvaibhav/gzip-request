const http = require("http");
const zlib = require("zlib");

const server = http.createServer((req, res) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk;
  });

  req.on("end", () => {
    if (req.url === "/uncompressed") {
      console.log("Received request for uncompressed data:");
      console.log(
        "Request Size:",
        Buffer.byteLength(requestBody, "utf-8"),
        "bytes"
      );
      //   console.log("Request Body:", requestBody);
      res.end("Received uncompressed data");
    } else if (req.url === "/compressed") {
      zlib.gunzip(
        Buffer.from(requestBody, "base64"),
        (err, uncompressedData) => {
          if (err) {
            console.error("Error decompressing data:", err.message);
            res.statusCode = 500;
            res.end("Error decompressing data");
            return;
          }
          console.log("Received request for compressed data:");
          console.log(
            "Request Size:",
            Buffer.byteLength(requestBody, "base64"),
            "bytes (compressed)"
          );
          console.log("Uncompressed Size:", uncompressedData.length, "bytes");
          //   console.log("Uncompressed Body:", uncompressedData.toString());
          res.end("Received compressed data");
        }
      );
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  });
});

const port = 3120;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
