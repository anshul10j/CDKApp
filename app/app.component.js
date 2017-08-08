  /* 
   * @modulename CitySDKApp
   * @componentname appComponent 
   *  
   */
angular.module('CitySDKApp')

.component('appComponent', {
  template:`
          <header>
            <span>Praking Garages Amsterdam</span>
          </header>
          <parking-garage-component></parking-garage-component>
        `
});
