module.exports = {
  staticFileGlobs: [
    '*.bundle.js',
    'dist/*.*',
    'src/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,mp3}',
    'src/**/**.js',
    'src/**/**.css',
    'favicon.ico',
    'src/index.html',
    'mainifest.json',
    'service-worker.js'
  ],
  root: 'src',
  stripPrefix: 'src/',
  templateFilePath: './service-worker.tmpl',
  navigateFallback: './index.html',
  maximumFileSizeToCacheInBytes: 5097152,
  runtimeCaching: [{
    urlPattern: /\//,
    handler: 'fastest'
  }]
};
