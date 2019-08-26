define(['angular'], function() {
	return  ["$scope", "$rootScope", "$document", '$location', '$route', 
	function ($scope,   $rootScope,   $document,   $location,   $route) {

		$document.find("#badge").focus();

		$rootScope.contact = null;
		$rootScope.badge   = "";

		$scope.canScan = function() { return $route.current.$$route.canScan; }
		$scope.location= $route.current.params.location;

		$scope.setLocation = function(location) {
			$location.url('/'+location);
		}



	}];
});
