
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "ui": {
        "port": 3001,
        "weinre": {
            "port": 4001
        }
    },
    "files": false,
    "watchEvents": [
        "change"
    ],
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": {
      "baseDir": "/",
    },
    "https": {
      "key": "./ssl/server.key",
      "cert": "./ssl/server.crt"
    },
    "proxy": false,
    "port": 8080,
    "middleware": [
      require('connect-logger')(),
      require('connect-history-api-fallback')({
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        disableDotRule: true
      }),
    ],
    "serveStatic": ['dist/*.*'],
    "ghostMode": false,
    "logLevel": "info",
    "logPrefix": "Browsersync",
    "logConnections": true,
    "logFileChanges": true,
    "logSnippet": true,
    "rewriteRules": [],
    "open": false,
    "browser": "default",
    "cors": false,
    "xip": false,
    "hostnameSuffix": false,
    "reloadOnRestart": false,
    "notify": true,
    "scrollProportionally": false,
    "scrollThrottle": 0,
    "scrollRestoreTechnique": "window.name",
    "scrollElements": [],
    "scrollElementMapping": [],
    "reloadDelay": 0,
    "reloadDebounce": 0,
    "reloadThrottle": 0,
    "plugins": [
      "browser-sync-logger"
    ],
    "injectChanges": true,
    "startPath": null,
    "minify": true,
    "host": null,
    "localOnly": false,
    "codeSync": false,
    "timestamps": true,
    "clientEvents": [
        "scroll",
        "scroll:element",
        "input:text",
        "input:toggles",
        "form:submit",
        "form:reset",
        "click"
    ],
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    },
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    }
};
