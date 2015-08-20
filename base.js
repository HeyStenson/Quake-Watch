var map;

	var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"


$(function(){

	function getQuakes(){

		map = new google.maps.Map(document.getElementById('map'), {
	    		zoom: 9,
	    		center: {lat: 37.8365, lng: -122.44}
	  	});

		$.get(weekly_quakes_endpoint, function(response_data){

			response_data.features.forEach(function(elem){

				var location = elem.properties.title;
				var timeQuake = elem.properties.time;
				var hoursElapsed = Math.round((Date.now() - timeQuake)/3600000);

				var quakeLng = elem.geometry.coordinates[0];
				var quakeLat = elem.geometry.coordinates[1];
				var quakeLatLng = {lat: quakeLat, lng: quakeLng};

			  	var marker = new google.maps.Marker({
			    	position: quakeLatLng,
			    	map: map,
			    	title: 'Earthquake!'
			  	});

			$('#info').append('<p>' + location + ' / ' + hoursElapsed + ' hours ago</p>');

			})
		})

	}

	getQuakes();

});

