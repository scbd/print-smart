define(['lodash', 'angular'], function(_) {
	return ["$scope", "$http", function ($scope, $http) {

        $http.get("/api/v2015/countries").then(function(res){

            $scope.countries = _(res.data).sortBy(function(country){

                return country.name.en.toLowerCase();

            }).map(function(country, index){
                return {
                    code : pad(index+1),
                    assignment : country.code.toLowerCase(),
                    locked : true,
                    name : country.name.en,
                    items : [ ]
                };
            }).value();

        }).catch(function(error){

            $scope.countries = error.data || error;

        });

        //==============================
        //
        //
        //==============================
        $scope.$watch("startIndex+stopIndex+priority", function(){

            if($scope.startIndex<=0 && $scope.stopIndex<=0) {
                delete $scope.boxes;
                return;
            }

            $scope.boxes = [];

            for(var index=$scope.startIndex; index<=$scope.stopIndex; index++)
            {
                $scope.boxes.push({
                    code : pad(index),
                    assignment : null,
                    priority : $scope.priority || 0,
                    items : [ ]
                });
            }
        })

        //==============================
        //
        //
        //==============================
        function pad(v) {

            v = v.toString();

            if(v.length<4) v = "0"+v;
            if(v.length<4) v = "0"+v;
            if(v.length<4) v = "0"+v;
            if(v.length<4) v = "0"+v;

            return v;
        }
	}];
});
