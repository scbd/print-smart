define(['app', 'providers/extended-route'], function(app) { 'use strict';

  app.config(['extendedRouteProvider', '$locationProvider', function($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/',                              {templateUrl: 'views/index.html',         resolveController: true })
        .when('/management/boxes',              {templateUrl: 'views/management/boxes.html',     resolveController: true })
        .when('/statistics',                    {templateUrl: 'views/stats.html',         resolveController: true })
        .when('/printshop',                     {templateUrl: 'views/printshop.html',     resolveController: true })
        .when('/authorization',                 {templateUrl: 'views/authorization.html', resolveController: true })
        .when('/badge/:badge',                  {templateUrl: 'views/index-id.html',      resolveController: true })
        .when('/404',                           {templateUrl: 'views/404.html',           })
        .otherwise({redirectTo: '/404'});
    }
  ]);
});
