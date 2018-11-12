define(['angular', 'app', 'ngCookies'], function(ng) {

	// baseUrl => '/printsmart'
	var baseUrl = (ng.element('head > base').attr('href')||'').replace(/\/*$/, '') || '/';

	return ["$scope",'$location', '$document', '$cookies',  function ($scope, $location, $document, $cookies) {

		$document.find("#authorization").focus();

		$scope.location = $cookies.get('location');

		$scope.setAuthorization = function(){

			var expiration = new Date();

			expiration.setMonth(expiration.getMonth()+1);

			if($scope.location) $cookies.put   ('location', $scope.location, { path : baseUrl,  expires : expiration });
			else                $cookies.remove('location',                  { path : baseUrl });

			if($scope.authorizationKey) {
                $cookies.put('machineAuthorization', $scope.authorizationKey, { path : baseUrl,        expires : expiration });
				$cookies.put('printShop',            "true",                  { path : '/', expires : expiration });
			}
			
			if(!$scope.authorizationKey && !$scope.location) {
                $cookies.remove('machineAuthorization', { path : baseUrl });
                $cookies.remove('printShop',            { path : '/' });
			}

			$location.path('/');
		};
	}];
});
