module.exports = {
  staticFileGlobs: [
    'dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,mp3}',
    'favicon.ico',
    'mainifest.json',
    'service-worker.js'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  templateFilePath: './service-worker.tmpl',
  navigateFallback: './index.html',
  maximumFileSizeToCacheInBytes: 5097152,
  runtimeCaching: [{
    urlPattern: /\//,
    handler: 'fastest'
  }]
};
