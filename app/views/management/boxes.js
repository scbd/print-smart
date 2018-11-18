define(['lodash', 'libs/diacritic/diacritics', 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js', 'angular'], 
        function(_, diacritics, ClipboardJS) {
	return ["$scope", "$http", function ($scope, $http) {

        new ClipboardJS('button');

        $scope.location=""

        $http.get("/api/v2015/countries").then(function(res){

            $scope.countries = _(res.data).sortBy(function(country){

                return diacritics.clean(country.name.en).toLowerCase();

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
        $scope.$watch("startIndex+stopIndex+priority+codeLength+prefix+location", function(){

            if($scope.startIndex<=0 && $scope.stopIndex<=0) {
                delete $scope.boxes;
                return;
            }

            $scope.boxes = [];

            var prefix     = $scope.prefix||'';
            var codeLength = Math.min(Math.max($scope.codeLength||4,0),10);
            var location   = $scope.location || undefined;

            for(var index=$scope.startIndex; index<=$scope.stopIndex; index++)
            {
                $scope.boxes.push({
                    code : prefix+pad(index, codeLength),
                    assignment : null,
                    priority : $scope.priority || 0,
                    location : location,
                    items : [ ]
                });
            }
        })

        //==============================
        //
        //
        //==============================
        function pad(v, len) {

            v = v.toString();

            while(v.length < len)
                v = "0"+v;

            return v;
        }
	}];
});
