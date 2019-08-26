define(['app','lodash', 'providers/extended-route','authentication'], function(app,_) { 'use strict';

  app.config(['extendedRouteProvider', '$locationProvider', function($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/',                  {templateUrl: 'views/index.html',         resolveController: true, canScan:true })
        .when('/management/boxes',  {templateUrl: 'views/management/boxes.html',     resolveController: true })
        .when('/statistics',        {templateUrl: 'views/stats.html',         resolveController: true, resolve : { user : securize(["Administrator"]) } })
        .when('/printshop',         {templateUrl: 'views/printshop.html',     resolveController: true })
        .when('/authorization',     {templateUrl: 'views/authorization.html', resolveController: true })
        .when('/authorize',         {redirectTo:  '/authorization' })
        .when('/badge/:badge',      {templateUrl: 'views/index-id.html',      resolveController: true })

        .when('/not-found', {templateUrl: 'views/404.html'}).when('/404', {redirectTo: '/not-found'})
        .when('/forbidden', {templateUrl: 'views/403.html'}).when('/403', {redirectTo: '/forbidden'})

        .when('/:location',                  {templateUrl: 'views/index.html',                resolveController: true, canScan:true })
        .when('/:location/badge/:badge',     {templateUrl: 'views/index-id.html',             resolveController: true })
        .when('/:location/management/boxes', {templateUrl: 'views/management/boxes.html',     resolveController: true })        
        .when('/:location/printshop',        {templateUrl: 'views/printshop.html',            resolveController: true })


        .otherwise({redirectTo: '/not-found'});
  }]);

  //============================================================
  //
  //
  //============================================================
  function securize(requiredRoles) {

      return ['$q', '$rootScope', 'authentication', '$location', '$window', function($q, $rootScope, authentication, $location, $window) {

          return $q.when(authentication.getUser()).then(function (user) {

              var hasRole = !!_.intersection(user.roles, requiredRoles).length;

              if (!user.isAuthenticated) {
                  $window.location.href = 'https://accounts.cbd.int/signin?returnurl='+encodeURIComponent($location.absUrl());
                  throw user; // stop route change!
              }
              else if (!hasRole)
                  $location.url('/403?returnurl='+encodeURIComponent($location.url()));
              return user;
          });
      }];
  }

});
