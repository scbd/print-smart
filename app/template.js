/* globals escape: false */
define(['app'], function(app) {

	app.controller("PrintSmartCtrl", ["$scope", "$location", "$timeout", "$document", function ($scope, $location, $timeout, $document) {

		$scope.$watch(function() { return $location.path(); }, function(path){

			if(path == "/") {
				$scope.badge = "";
				$scope.$root.contact = null;
			}
		});

	    $scope.submit = function () {

			if($scope.badge) {

				var badge = $scope.badge=='boxes' ? "boxes" : (($scope.badge||"").replace(/[^0-9]/g, "") || "INVALID_BADGE_ID");

				$location.path('/badge/'+escape(badge));
			}

			$scope.badge = "";
	    };

		$scope.close = function() {
			$location.hash('');
			$location.search({});
			$location.path("/");
		};

		$scope.isHome = function () {
			return $location.path() == "/";
		};

		$scope.formatBadge = function (code) {
			return (code||"").replace(/(.{4})(.+)/g, "$1-$2");
		};

		function keepBadgeFocus()
		{
			$document.find("#badge").focus();

			$scope.$root.keepBadgeFocusPromise = $timeout(keepBadgeFocus, 500);
		}

		if(!$scope.$root.keepBadgeFocusPromise)
			keepBadgeFocus();
	}]);
});
