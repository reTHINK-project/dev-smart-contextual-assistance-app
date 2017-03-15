var history = require('connect-history-api-fallback');

var config = {
  open: false,
  ghostMode: false,
  codeSync: false,
  port: 8080,
  https: {
    key: "rethink-certificate.key",
    cert: "rethink-certificate.cert"
  },
  server: {
    baseDir: "src",
    routes: {
      "/node_modules": "node_modules"
    },
    middleware: [
      require("connect-logger")(),
      history({
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        disableDotRule: true
      })
    ]
  }
};


module.exports = config;