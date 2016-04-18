// 1. define the module and the other module dependencies (if any)
angular.module('conversationManager', ['sessionManager'])

// 2. set a constant
    .constant('MODULE_VERSION', '0.0.1')

// 3. maybe set some defaults
    .value('defaults', {
        foo: 'bar'
    })

// 4. define a module component
    .factory('factoryName', function() {/* stuff here */})

// 5. define another module component
    .directive('directiveName', function() {/* stuff here */})
;// and so on