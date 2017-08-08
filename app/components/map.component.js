 /* 
   * @modulename mapModule
   * @componentname mapComponent 
   *
   */
angular.module('mapModule', [])

    .component('mapComponent', {
        template: `
  <div id="gmaps"></div>
  `,
        bindings: {
            locationData: '<',
            garageName: "<"
        },
        controller: mapController,
    });

function mapController($element) {
    self = this;
    self.locationData;
    self.map;
    self.infoWindow;
    self.markers = [];

     /*
       @description:map configuration Obj
     */
    self.mapOptions = {
        center: new google.maps.LatLng(53, 5),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };


    /*
       @description:Inintialize map
     */

    self.initMap = function() {
        self.map = new google.maps.Map($element[0], self.mapOptions);
    }

     /*
       @description:Set the marker on the map with click handler for infoWindow
     */

    self.setMarker = function(map, position, title) {
        var marker;
        var markerOptions = {
            position: position,
            map: map,
            title: title,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        };

        marker = new google.maps.Marker(markerOptions);
        self.markers.push(marker); // add marker to array

        google.maps.event.addListener(marker, 'click', function() {
            // close window if not undefined
            if (self.infoWindow !== void 0) {
                self.infoWindow.close();
            }
            var longStatusImage, shortStatusImage;
            var availabiltyObj = self.getAvailabiltyRatio();
            if (availabiltyObj.shortAvailabiltyPercent > 15) {
                shortStatusImage = "assets/images/Green_Light.jpg";
            } else {
                shortStatusImage = "assets/images/Red_Light.jpg";
            }
            if (availabiltyObj.LongAvailabiltyPercent > 15) {
                longStatusImage = "assets/images/Green_Light.jpg";
            } else {
                longStatusImage = "assets/images/Red_Light.jpg";
            }


            // customized Info window
            var infoWindowContent = '<div class="iw-container"><div class="iw-title">' + title + '</div>' +
                '<div class="iw-content"><div class="iw-long-content"><div class="iw-long-title">Long Parking</div><div class="iw-long-image">' +
                '<img src=' + longStatusImage + ' alt="Smiley face" height="42" width="42"></div>' +
                '<div class="iw-long-status"><div> <span>Capacity : </span>' +
                '<span>' + self.locationData.properties.layers['parking.garage'].data.LongCapacity + '</span></div><div><span>Available : </span>' +
                '<span>' + self.locationData.properties.layers['parking.garage'].data.FreeSpaceLong + '</span></div></div></div>' +
                '<div class="iw-short-content"><div class="iw-short-title">Short Parking</div> <div class="iw-short-image">' +
                '<img src=' + shortStatusImage + ' alt="Smiley face" height="42" width="42"></div><div class="iw-short-status">' +
                '<div><span>Capacity : </span>' +
                '<span>' + self.locationData.properties.layers['parking.garage'].data.ShortCapacity + '</span></div><div><span>Available : </span>' +
                '<span>' + self.locationData.properties.layers['parking.garage'].data.FreeSpaceShort + '</span></div></div> </div> </div> <div>';

            var infoWindowOptions = {
                content: infoWindowContent
            };
            self.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            self.infoWindow.open(self.map, marker);
        });
    }

    /*
       @description:get Availability of long and short parking in garage
     */

    self.getAvailabiltyRatio = function() {
        var availabiltyRatioObj = {};
        availabiltyRatioObj['shortAvailabiltyPercent'] = Math.floor((self.locationData.properties.layers['parking.garage'].data.FreeSpaceShort / self.locationData.properties.layers['parking.garage'].data.ShortCapacity) * 100);
        availabiltyRatioObj['LongAvailabiltyPercent'] = Math.floor((self.locationData.properties.layers['parking.garage'].data.FreeSpaceLong / self.locationData.properties.layers['parking.garage'].data.LongCapacity) * 100);
        return availabiltyRatioObj;
    }
    
     /* 
       @description:Will detect changes and execute 
     */
    self.$onChanges = function() {
        self.initMap();
        self.markers = [];
        self.setMarker(self.map, new google.maps.LatLng(self.locationData.geometry.coordinates[1], self.locationData.geometry.coordinates[0]), self.locationData.properties.layers['parking.garage'].data.Name);
    };
}
