(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'main':                       'dist',
    'rxjs':                       'node_modules/rxjs',
    'symbol-observable':          'node_modules/symbol-observable',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',
    'runtime-browser':            'node_modules/runtime-browser/bin',
    'webrtc-adapter':             'node_modules/webrtc-adapter/out',
    'ng2-bootstrap':              'node_modules/ng2-bootstrap',
    'moment':                     'node_modules/moment/moment.js',
    'jquery':                     'node_modules/jquery/dist'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'main':                       { main: 'main.js', defaultExtension: 'js' },
    'jquery':                     { main: 'jquery.js'},
    'symbol-observable':          { main: 'index.js'},
    'ng2-bootstrap':              { main: 'ng2-bootstrap.js', defaultExtension: 'js'},
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'runtime-browser':            { main: 'rethink.js', defaultExtension: 'js' },
    'webrtc-adapter':             { main: 'adapter.js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/forms',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/upgrade',
    '@angular/router',
    '@angular/router-deprecated'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
