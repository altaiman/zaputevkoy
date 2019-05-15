'use strict';

(function (root) {

  if ($('#map').get(0)) {
    var initMap = function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.340304, lng: 83.752213 },
        zoom: 15,
        disableDefaultUI: true
      });
    };

    var map;

    initMap();
  };
})(window);