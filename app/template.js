/* globals escape: false */
define(['app', 'keymaster', 'ngCookies'], function(app, key) {

	app.controller("PrintSmartCtrl", ["$scope", "$location", "$timeout", "$document", "$cookies", function ($scope, $location, $timeout, $document, $cookies) {

		$scope.location = Captialize($cookies.get('location'));

		$scope.$watch(function() { return $location.path(); }, function(path){

			if(path == "/") {
				$scope.badge = "";
				$scope.$root.contact = null;
			}
		});

        key('esc', close);

	    $scope.submit = function () {

			if($scope.badge) {

				var badge = $scope.badge=='boxes' ? "boxes" : (($scope.badge||"").replace(/[^0-9]/g, "") || "INVALID_BADGE_ID");

				$location.path('/badge/'+escape(badge));
			}

			$scope.badge = "";
	    };

		$scope.close = close;

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

        function close() {
            $location.url("/");
        };

	}]);

	function Captialize(text) {

		if(text) {
			text = text.replace(/\b\w/g, function(l){ return l.toUpperCase() });
		}

		return text;
	}
});
