module.exports = {
  open: false,
  online: true,
  port: 443,
  ghostMode: false,
  codeSync: false,
  logFileChanges: true,
  proxy: false,
  https: {
    "key": "rethink-certificate.key",
    "cert": "rethink-certificate.cert"
  },
  server: {
    baseDir: './',
    middleware: {
      2: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    },
    routes: {
      "/.well-known/runtime": "node_modules/runtime-browser/bin",
      "/.well-known/hyperty": "resources/descriptors/"
    }
  }
};
