define(['app', 'ngCookies'], function(app) { 'use strict';

    app.factory('machineAuthorizationHttpIntercepter', ["$cookies", function($cookies) {

		return {
			request: function(config) {

				var trusted = /^\/api\/v2014\/printsmart-requests/i.test(config.url) ||
							  /^\/api\/v2014\/kronos/i             .test(config.url);
							  
				if(trusted && $cookies.get("machineAuthorization")) {

                    config.headers = config.headers || {};
                    config.headers["x-machine-authorization"] = $cookies.get("machineAuthorization");
                }

                return config;
			}
		};
	}]);
});
