module.exports = {
  open: false,
  online: true,
  port: 443,
  https: {
    "key": "rethink-certificate.key",
    "cert": "rethink-certificate.cert"
  },
  server: {
    baseDir: './',
    middleware: {
      1: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    },
    routes: {
      "/.well-known/runtime": "node_modules/runtime-browser/bin",
      "/.well-known/hyperty": "resources/descriptors/"
    }
  }
}
