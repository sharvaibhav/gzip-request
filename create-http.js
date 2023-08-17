const fs = require("fs");
const compressAndEncodeModule = require("./encoding-utility");

(async () => {
  // Read JSON data from file
  const jsonData = JSON.parse(fs.readFileSync("request-data.json", "utf-8"));
  const { compressAndEncode } = compressAndEncodeModule(jsonData);

  // Convert JSON data to a string before passing to compressAndEncode
  const jsonString = JSON.stringify(jsonData);
  const compressedData = await compressAndEncode(jsonString);

  // Create content for .http files
  const httpContentCompressed = `
POST http://localhost:3120/compressed
Host: localhost:3120
Content-Type: application/octet-stream
Content-Encoding: gzip
Connection: close

${compressedData}
`;

  const httpContentUncompressed = `
POST http://localhost:3120/uncompressed
Content-Type: application/json

${JSON.stringify(jsonData, null, 2)}
`;

  // Write content to .http files
  fs.writeFileSync(
    "./requests/request-compressed.http",
    httpContentCompressed,
    "utf-8"
  );
  fs.writeFileSync(
    "./requests/request-uncompressed.http",
    httpContentUncompressed,
    "utf-8"
  );

  console.log(
    "Request files created: request-compressed.http, request-uncompressed.http"
  );
})();
