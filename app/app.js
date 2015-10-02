define(['angular', 'angular-growl'], function(angular) { 'use strict';

    var deps = ['ngRoute', 'ngCookies', 'angular-growl'];

    angular.defineModules(deps);

    var app = angular.module('app', deps);

    app.config(['$httpProvider', 'growlProvider', function($httpProvider, growlProvider) {

        $httpProvider.useApplyAsync(true);
        $httpProvider.interceptors.push('machineAuthorizationHttpIntercepter');

        growlProvider.globalTimeToLive(5000);
        growlProvider.globalEnableHtml(false);

    }]);

    app.factory('machineAuthorizationHttpIntercepter', ["$q", "apiToken", "$cookies", function($q, apiToken, $cookies) {

		return {
			request: function(config) {

				var trusted = /^\/api\/\/v2014\/printsmart-requests/i.test(config.url) ||
                              /^\/api\/\/v2014\/kronos/i             .test(config.url);

				var hasAuthorization = (config.headers||{}).hasOwnProperty('machineAuthorization');

				if(!trusted || hasAuthorization) // no need to alter config
					return config;

				//Add token to http headers

                if($cookies.get("machineAuthorization")) {
                    config.headers = config.headers || {};
                    config.headers.machineAuthorization = $cookies.get("machineAuthorization");
                }
			}
		};
	}]);


    return app;
});
