//Directives
weatherApp.directive('weatherReport', function(){
    return{
        restrict : 'E', //this can only be declared as an element in the html, <weather-report>
        templateUrl : 'directives/weatherReport.html',
        replace : true,
        scope : {
            weatherDay : '=', //= because it's an object 
            convertToStandard : "&",
            convertToDate : "&",
            dateFormat : "@"
        }
    }
});