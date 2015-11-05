define(['app', 'ngCookies'], function() {

	return ["$scope",'$location', '$document', '$cookies',  function ($scope, $location, $document, $cookies) {

		$document.find("#authorization").focus();

		$scope.setAuthorization = function(){

			if($scope.authorizationKey) {
				var expiration = new Date();

				expiration.setMonth(expiration.getMonth()+1);

                $cookies.put('machineAuthorization', $scope.authorizationKey, { path : '/printsmart', expires : expiration });
				$cookies.put('printShop',            "true",                  { path : '/insession',  expires : expiration });
			}
			else {
                $cookies.remove('machineAuthorization', { path : '/printsmart' });
                $cookies.remove('printShop',            { path : '/insession' });
			}

			$scope.authorizationKey = '';

			$location.path('/');
		};
	}];
});
