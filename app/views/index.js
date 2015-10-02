define(['angular'], function() {
	return ["$rootScope", "$document", function ($rootScope, $document) {

		$document.find("#badge").focus();

		$rootScope.contact = null;
		$rootScope.badge   = "";

	}];
});
