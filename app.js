//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']); //ngResource service: wraps up the http service an makes it easier to get data from the internet


// Routes
weatherApp.config(function($routeProvider){
    
    $routeProvider //let's us specify routes (what should I do when I see a particular thing in the hash)
    
    .when('/', {
        templateUrl : 'pages/home.html',
        controller : 'homeController'
    })
    
    .when('/forecast', {
        templateUrl : 'pages/forecast.html',
        controller : 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl : 'pages/forecast.html',
        controller : 'forecastController'
    })
    
});

//Services
weatherApp.service('cityService', function(){
   this.city = "New York, NY"; 
});


//Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){ 
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){ //I'll watch the 'city' property in my scope, and whenever it changes, I'll change it in the service
        cityService.city = $scope.city;
    })
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){ //$routeParams to get parameters from the route
    //console.log('ran');
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2'; // '2' string, to match the days menu where ng-class is used (uses === so it checks for type equality aswell, in this case, a string, so it will highlight the selected days)
    
    $scope.weatherAPI = 
        $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=d1f60a5755f43f53af17c505d97d9ac5",
                 { callback : "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    //console.log($scope.weatherResult); //show results from de API
    
    $scope.convertToCelsius = function(degKelvins){
        return (degKelvins - 273).toFixed(1); //toFixed formats a number using fixed point notation
    }
    
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000); //dt comes in milliseconds from the API
    }
    
}]);