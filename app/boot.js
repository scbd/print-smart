fixIEConsole();

window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
    waitSeconds: 120,
    baseUrl : '/app',
    paths: {
        'angular'         : 'libs/angular/angular.min',
        'angular-animate' : 'libs/angular-animate/angular-animate.min',
        'angular-cookies' : 'libs/angular-cookies/angular-cookies.min',
        'angular-growl'   : 'libs/angular-growl/build/angular-growl.min',
        'angular-moment'  : 'libs/angular-moment/angular-moment.min',
        'angular-route'   : 'libs/angular-route/angular-route.min',
        'async'           : 'libs/requirejs-plugins/src/async',
        'bootstrap'       : 'libs/bootstrap/dist/js/bootstrap.min',
        'domReady'        : 'libs/requirejs-domready/domReady',
        'jquery'          : 'libs/jquery/dist/jquery.min',
        'moment'          : 'libs/moment/min/moment.min',
        'text'            : 'libs/requirejs-text/text',
        'underscore'      : 'libs/underscore/underscore'
    },
    shim: {
        'angular'         : { 'deps': ['jquery' ], 'exports': 'angular' },
        'angular-animate' : { 'deps': ['angular'] },
        'angular-cookies' : { 'deps': ['angular'] },
        'angular-growl'   : { 'deps': ['angular'] },
        'angular-moment'  : { 'deps': ['angular', 'moment'] },
        'angular-route'   : { 'deps': ['angular'] },
        'bootstrap'       : { 'deps': ['jquery' ] },
        'moment'          : { 'deps': ['jquery' ] }
    },
});

// BOOT

require(['angular', 'domReady!', 'bootstrap', 'app', 'routes', 'template'], function(ng, doc){

    ng.bootstrap(doc, ['app']);
    ng.resumeBootstrap();

});


//==================================================
// Protect window.console method calls, e.g. console is not defined on IE
// unless dev tools are open, and IE doesn't define console.debug
//==================================================
function fixIEConsole() { 'use strict';

    if (!window.console) {
        window.console = {};
    }

    var methods = ["log", "info", "warn", "error", "debug", "trace", "dir", "group","groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
    var noop    = function() {};

    for(var i = 0; i < methods.length; i++) {
        if (!window.console[methods[i]])
            window.console[methods[i]] = noop;
    }
}
