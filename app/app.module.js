/* 
   * @modulename CitySDKApp
   * @componentname appComponent 
   * @depedencies :
   *     parkingGarage
   *     mapModule
   *     ui.router
   */
angular.module('CitySDKApp', [
        'parkingGarage',
        'mapModule',
        'ui.router'
    ])


     //confiugre routes 
    .config(function($stateProvider, $urlServiceProvider) {
        $urlServiceProvider.rules.otherwise({
            state: 'parkingGarageList'
        });

        $stateProvider.state('parkingGarageList', {
            url: '/parkingGarages',
            component: 'appComponent' 

        });

    });


