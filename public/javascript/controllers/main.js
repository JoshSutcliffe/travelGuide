// set up controllers here
(function() { 

	var travelApp = angular.module('travelApp', []);

	// ===== TRY AND DO EVERYTHING TO DO WITH DATA IN THE SERVICE (THINK OF IT AS A MODEL)
	travelApp.factory('TravelAppFactory', [ function(placeName) {

		// ===== FACTORIES HAVE TO HAVE EVERYTHING IN A RETURN STATEMENT
		// to call it: TravelAppFactory.functionName(place.name);
		var factoryFunctions = {
			googleAutocomplete: function() {
				// ===== SETTING UP KEYS
				var placesKey = config.PLACES_KEY;

				// ===== MAPS AND AUTOCOMPLETE
				// Get the html input element for the autocomplete search box
				var input = document.getElementById('pac-input');

				// THESE BOUNDS ARE GLOBAL - DOESN'T ADD ANY BIAS
				var defaultBounds = new google.maps.LatLngBounds(
					new google.maps.LatLng(-90, -180),
					new google.maps.LatLng(90, 180)
				);

				var options = {
					bounds: defaultBounds
				};

				// Create the autopcomplete object
				return new google.maps.places.Autocomplete(input, options);
			}
		};
		return factoryFunctions
	}]);

	// ===== USE THIS TO UPDATE THE VIEWS
	travelApp.controller('TravelAppController', function($scope, TravelAppFactory) {

		var autocomplete = TravelAppFactory.googleAutocomplete();

		// ===== GRAB THE JSON FROM THE CLICK EVENT
		$scope.userSearch = function() {
			var place = autocomplete.getPlace();
			// CALL A FUNCTION TO FILL OUT HTML WITH DATA
			// $scope.getApis(place.name);
			console.log(place.name)

		};

	});

}());
