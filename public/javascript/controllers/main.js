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
				var origin = document.getElementById('origin-input');
				var destination = document.getElementById('destination-input');

				// THESE BOUNDS ARE GLOBAL - DOESN'T ADD ANY BIAS
				var defaultBounds = new google.maps.LatLngBounds(
					new google.maps.LatLng(-90, -180),
					new google.maps.LatLng(90, 180)
				);

				var options = {
					bounds: defaultBounds
				};

				// Create the autocomplete object
				return GAResults = {
					GAResult1: new google.maps.places.Autocomplete(destination, options),
					GAResult2: new google.maps.places.Autocomplete(origin, options)
				};
				
			},
			// HANDLE ALL DATA FOR THE MAP CALL
			googleMap: function(map) {
		        var marker = new google.maps.Marker({
		            map: map,
		            anchorPoint: new google.maps.Point(0, -29)
		        });
		        return marker;
			},
            // GRAB COUNTRY NAME
            destinationCountry: function(destination) {
                var destCountry;
                for(var i = 0; i < destination.address_components.length; i++) {
                    if(destination.address_components[i].types[0] == "country") {
                        var country = destination.address_components[i].long_name;
                        destCountry = country.toLowerCase().replace(/\s/g, "-");
                        break
                    }; 
                };
                return destCountry;
            },
            // GRAB CITY NAME
            destinationCity: function(destination) {
                return destination.address_components[0].long_name.toLowerCase();
            }
		};
		return factoryFunctions
	}]);

	// ===== USE THIS TO UPDATE THE VIEWS
	travelApp.controller('TravelAppController', function($scope, TravelAppFactory) {

		var autocomplete = TravelAppFactory.googleAutocomplete();

		// ===== GRAB THE JSON FROM THE CLICK EVENT
		$scope.userSearch = function() {
			var origin = autocomplete.GAResult2.getPlace();
			var destination = autocomplete.GAResult1.getPlace();
            
			// FILL OUT HTML MAP WITH DATA
			$scope.googleMap(destination);
            // NOMAD LIST API
            $scope.nomadList(destination);
			// CURRENCY CONVERTER FUNCTION
			$scope.currencyConverter(origin, destination)
		};

		// ===== FUNCTION TO ADD THE MAP AFTER THE USER SEARCH
		$scope.googleMap = function(userDestination) {
			var userDestinationLat = userDestination.geometry.location.lat();
			var userDestinationLng = userDestination.geometry.location.lng();
			var elem = document.getElementById('map');
	        var map = new google.maps.Map(elem, {
	          center: {lat: userDestinationLat, lng: userDestinationLng},
	          zoom: 13
	        });
			var marker = TravelAppFactory.googleMap(map);
			marker.setIcon({
				url: userDestination.icon,
	            size: new google.maps.Size(71, 71),
	            origin: new google.maps.Point(0, 0),
	            anchor: new google.maps.Point(17, 34),
	            scaledSize: new google.maps.Size(35, 35)
			});
			marker.setPosition(userDestination.geometry.location);
			marker.setVisible(true);
		};

        // ===== NOMAD LIST API
        $scope.nomadList = function(destination) {
            
            // ===== GRAB THE COUNTRY NAME & CITY
            var destCountry = TravelAppFactory.destinationCountry(destination);
            var destCity = TravelAppFactory.destinationCity(destination);
            var api = "https://nomadlist.com/api/v2/list/cities/" + destCity + "-" + destCountry;
            
            // Get Nomad List Result
            var nomadResult = function(api) {
                $.getJSON(api, {
                    format: "json"
                }).done(function(data) {
                    var costValuesObj = data.result[0].cost;
                    for(var i = 0; i < 13; i++) {
                        $('.nomad ul').append('<li>' + Object.keys(costValuesObj)[i] + '</li>');
                        console.log(Object.keys(costValuesObj)[i]);
                        debugger
                        console.log(Object.values(costValuesObj)[i][0]);
                    }
                })
            }
            nomadResult(api);

        };
        
		// ===== CURRENCY CONVERTER
		$scope.currencyConverter = function(origin, destination) {

			// $.getJSON("http://apilayer.net/api/live?access_key=" + config.CURRENCY_KEY)
		};
        
	});

}());
