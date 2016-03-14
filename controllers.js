//Controllers
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService){ 
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){ //I'll watch the 'city' property in my scope, and whenever it changes, I'll change it in the service
        cityService.city = $scope.city;
    });
    
    $scope.submit = function(){
        $location.path("/forecast");
    };
}]);


weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService, weatherService){ //$routeParams to get parameters from the route
    //console.log('ran');
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2'; // '2' string, to match the days menu where ng-class is used (uses === so it checks for type equality aswell, in this case, a string, so it will highlight the selected days)
    
    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
    
    //console.log($scope.weatherResult); //show results from de API
    
    $scope.convertToCelsius = function(degKelvins){
        return (degKelvins - 273).toFixed(1); //toFixed formats a number using fixed point notation
    }
    
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000); //dt comes in milliseconds from the API
    }
    
}]);