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
