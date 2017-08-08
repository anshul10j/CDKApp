/* 
   * @modulename CitySDKApp
   * @servicename parkingGarageServ 
   *
   */

angular.module('CitySDKApp')

   .factory('parkingGarageServ', ['$q', '$http', function($q, $http) {
    return {
    getParkingGarageData: function() {
        var deferred = $q.defer();
        $http.get('http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25')
        .then(function(response){
          //return  Promise object with response data.
           deferred.resolve(response.data);
        })
        .catch(function(response){
          //return  Promise object with the given reason for rejection.
          deferred.reject(response); 

        });
        //  return promise object when request either resolve or reject
        return deferred.promise;  
    }
  }
}]);