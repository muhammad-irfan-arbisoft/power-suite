'use strict';

/* Controllers */

var powersuiteControllers = angular.module('powersuiteControllers', []);

powersuiteControllers.controller('SearchCtrl',['$scope', '$http','apiUrl','User','Dockets',
  function($scope, $http, apiUrl,User, Dockets) {

    $scope.searchDockets = function(dockets){
      console.log(dockets);
      $scope.school = Dockets.getSchool;
      //$scope.dockets = Dockets.getDockets;
        //$scope.school = $http({method: 'GET', url: apiUrl + '/schools/1', params: {access_token: User.access_token, email: User.email}});
        console.log($scope.school);
      $scope.dockets = {states:10, word: "SEARCH", to: new Date(2015, 3, 12), from: new Date(2015,3,15)};
    }
  }]
);

powersuiteControllers.controller('FavouritesCtrl',
  function($scope) {

  }
);

powersuiteControllers.controller('DatePickerCtrl', function ($scope) {
  $scope.today = function() {
    $scope.to_date = new Date();
    $scope.from_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.to_date = null;
    $scope.from_date = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
});
