angular.module('myApp', [
	'ngRoute',
	'ngAnimate',
	'ngSanitize',
	'ui.bootstrap'
])
.config( function ($routeProvider) {

	$routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

})
.controller('AboutCtrl', function($scope, $rootScope) {

	$rootScope.section = "about"
	$scope.title = "ABOUT"

})
.controller('HomeCtrl', function($scope, $rootScope, DataService) {

	$rootScope.section = "home"
	$scope.title = "HOME"
	$scope.getLocation = DataService.getLocation;

	DataService.getCuisines()
		.then( cuisines => $scope.cuisines = cuisines )


})
.factory("DataService", function( $http ) {

		function getCuisines() {
			const url = 'https://powerful-tundra-88780.herokuapp.com/cuisines';
			return $http.get( url ).then( d => d.data )
		}

	 function getLocation( val ) {

	    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
	      params: {
	        address: val,
	        sensor: false
	      }
	    })
	    .then( (response) => {
	    	return response.data.results.map( item => item.formatted_address )
	    })

	  };

		return { getLocation, getCuisines }

})

