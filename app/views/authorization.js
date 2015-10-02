define(['app', 'ngCookies'], function() {

	return ["$scope",'$location', '$document', '$cookies',  function ($scope, $location, $document, $cookies) {

		$document.find("#authorization").focus();

		$scope.setAuthorization = function(){

			if($scope.authorizationKey) {
				var expiration = new Date();

				expiration.setMonth(expiration.getMonth()+2);

				$cookies.put('machineAuthorization', $scope.authorizationKey, { path : 'printsmart', expires : expiration });
			}
			else {
				$cookies.remove('machineAuthorization', $scope.authorizationKey, { path : 'printsmart' });
			}

			$scope.authorizationKey = '';

			$location.path('/');
		};
	}];
});
