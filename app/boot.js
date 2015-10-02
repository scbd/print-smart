window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
    waitSeconds: 30,
    baseUrl : '/printsmart/app/',
    paths: {
        'authentication'  : 'services/authentication',
        'angular'         : 'libs/angular-flex/angular-flex',
        'ngRoute'         : 'libs/angular-route/angular-route.min',
        'ngCookies'       : 'libs/angular-cookies/angular-cookies.min',
        'ngAnimate'       : 'libs/angular-animate/angular-animate.min',
        'domReady'        : 'libs/requirejs-domready/domReady',
        'text'            : 'libs/requirejs-text/text',
        'jquery'          : 'libs/jquery/dist/jquery.min',
        'bootstrap'       : 'libs/bootstrap/dist/js/bootstrap.min',
        'lodash'          : 'libs/lodash/lodash.min',
        'angular-growl'   : 'libs/angular-growl/build/angular-growl.min',
        'moment'          : 'libs/moment/min/moment.min'
    },
    shim: {
        'libs/angular/angular.min' : { deps : ['jquery'] },
        'angular'                  : { deps : ['libs/angular/angular.min'] },
        'ngRoute'                  : { deps : ['angular'] },
        'ngCookies'                : { deps : ['angular'] },
        'ngAnimate'                : { deps : ['angular'] },
        'bootstrap'                : { deps : ['jquery' ] },
        'angular-growl'            : { deps : ['angular'] },
    },
});

// BOOT

require(['angular', 'domReady!', 'bootstrap', 'app', 'routes', 'template', 'services/machine-authorization-http-intercepter'], function(ng, doc) {
    ng.bootstrap(doc, ['app']);
    ng.resumeBootstrap();
});

// MISC

//==================================================
// Protect window.console method calls, e.g. console is not defined on IE
// unless dev tools are open, and IE doesn't define console.debug
//==================================================
(function fixIEConsole() { 'use strict';

    if (!window.console) {
        window.console = {};
    }

    var methods = ["log", "info", "warn", "error", "debug", "trace", "dir", "group","groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
    var noop    = function() {};

    for(var i = 0; i < methods.length; i++) {
        if (!window.console[methods[i]])
            window.console[methods[i]] = noop;
    }
})();
