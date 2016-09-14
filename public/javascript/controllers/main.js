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
			},
			// HANDLE ALL DATA FOR THE MAP CALL
			googleMap: function(map) {
		        var marker = new google.maps.Marker({
		            map: map,
		            anchorPoint: new google.maps.Point(0, -29)
		        });
		        return marker;
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
			// console.log(place.geometry.viewport);
			$scope.googleMap(place);
		};

		// ===== FUNCTION TO ADD THE MAP AFTER THE USER SEARCH
		$scope.googleMap = function(userPlace) {
			var elem = document.getElementById('map');
	        var map = new google.maps.Map(elem, {
	          center: {lat: -33.8688, lng: 151.2195},
	          zoom: 13
	        });
			var marker = TravelAppFactory.googleMap(map);
			// map.fitBounds(userPlace.geometry.viewport);
			marker.setIcon({
				url: userPlace.icon,
	            size: new google.maps.Size(71, 71),
	            origin: new google.maps.Point(0, 0),
	            anchor: new google.maps.Point(17, 34),
	            scaledSize: new google.maps.Size(35, 35)
			});
			marker.setPosition(userPlace.geometry.location);
			marker.setVisible(true);
		};

	});

}());
