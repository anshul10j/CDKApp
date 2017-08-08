
 /* 
   * @modulename parkingGarage
   * @componentname parkingGarageComponent 
   *
   */

angular.module('parkingGarage', [])

    .component('parkingGarageComponent', {
        template: `
                  <div class="main-container">
                      <div class="garage-list-container" ng-class="{'togglegaragelistview':!$ctrl.isMapVisible}">
                          <div ng-repeat="feature in $ctrl.parkingGarageList">
                              <div class="garage-data-container" ng-if="feature.properties.layers['parking.garage'].data.Name" ng-click="$ctrl.tabClick(feature)">
                                  <div class="garage-name">{{feature.properties.layers['parking.garage'].data.Name}}</div>
                                  <div class="arrow-right"></div>
                              </div>
                          </div>
                      </div>
                      <div ng-if="$ctrl.isMapVisible" class="map-container">
                          <map-component class="map-data-container" location-data="$ctrl.garageDataObj" garage-name="$ctrl.garageName"></map-component>
                          <div class="close-button" ng-click="$ctrl.closeMap()"></div>
                      </div>
                  </div>
        `,
        controller: parkingGarageController,
    });

function parkingGarageController(parkingGarageServ, $interval, $element) {
    vm = this;
    vm.parkingGarageList = [];
    vm.isMapVisible = false;
    vm.garageDataObj = {};
    vm.garageName = "";


    /* @purpose:Get Data for parking garage list
       @description:will call getParkingGarageData method of parkingGarageServ service that will return promise object
     */
    vm.getparkingGarageList = function() {
        parkingGarageServ.getParkingGarageData().then(function(response) {
            console.log("response :: ", response);
            vm.parkingGarageList = response.features;
            console.log("response :: ", vm.parkingGarageList);
        }, function(error) {
            console.log("error :: ", error);
        });
    }


     /*
       @purpose:EventHandler
       @description: When user click any item from  parking garage list it will open map
     */
    vm.tabClick = function(obj) {
        vm.garageDataObj = obj;
        vm.garageName = vm.garageDataObj.properties.layers['parking.garage'].data.Name;
        if (!vm.isMapVisible) {
            vm.isMapVisible = !vm.isMapVisible;
        }
    }
   
    /* 
       @purpose:EventHandler
       @description:Will close map
     */
    vm.closeMap = function() {
        vm.isMapVisible = !vm.isMapVisible;
    }

    /* 
       @description:Will call getparkingGarageList in every 10 sec to get updated data.
     */

    vm.stopTime = $interval(function() {
        vm.getparkingGarageList();
    }, 10000);
    
   
    
    /* 
       @description:Will detect changes and execute
     */
    vm.$onChanges = function() {
        vm.getparkingGarageList();
    };

     vm.$onDestroy = function() {
        $interval.cancel(vm.stopTime);
    };




}