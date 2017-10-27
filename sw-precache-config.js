module.exports = {
  staticFileGlobs: [
    '*.bundle.js',
    'src/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,mp3}',
    'src/**/**.js',
    'src/**/**.css',
    'src/index.html',
    'src/service-worker.js',
    'favicon.ico',
    'mainifest.json'
  ],
  root: 'src',
  stripPrefix: 'src/',
  templateFilePath: './service-worker.tmpl',
  navigateFallback: './index.html',
  maximumFileSizeToCacheInBytes: 5097152,
  runtimeCaching: [
    {
      urlPattern: /https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/materialize\/0.97.5\/css\/materialize.min.css/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/materialize\/0.97.5\/js\/materialize.min.js/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/jquery\/2.1.4\/jquery.js/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /https:\/\/fonts.googleapis.com\/icon\?family=Material\+Icons/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /https:\/\/localhost\/.well-known\/runtime\/index.html\/core.js/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: "./(.*)",
      handler: 'cacheFirst'
    }
  ]
};
