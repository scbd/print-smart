define(['app', 'text!./checkbox.html'], function(app, templateHtml) {

    //==============================================
    //
    //
    //==============================================
    app.directive('checkbox', ["$timeout", function($timeout) {
        return {
            restrict : "E",
            replace : true,
            template : templateHtml,
            scope :  {
                checked : "=ngModel",
                ngChange : "&"
            },
            link: function ($scope, element) {

                $scope.toggle = function() {

                    if(element.attr("disabled"))
                        return;

                    $scope.checked = !$scope.checked;

                    $timeout($scope.ngChange);
                }
            }
        };
    }]);
});
