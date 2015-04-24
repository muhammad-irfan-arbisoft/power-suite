'use strict';

/* Controllers */

var powersuiteControllers = angular.module('powersuiteControllers', []);

powersuiteControllers.controller('SearchCtrl', ['$scope', '$http', '$filter', 'apiUrl', 'User', 'Dockets',
        function ($scope, $http, $filter, apiUrl, User, Dockets) {
            $scope.moduleState = 'list';

            $scope.showDetail = function(docket){
                $scope.selectedDocket = docket;
                $scope.moduleState = 'detail';
                $scope.docketFilings = Dockets.getDocketFilings(docket);
            };

            Date.prototype.getDateAsString = function () {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd = this.getDate().toString();
                return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
            };
            $scope.results = null;
            $scope.dockets = Dockets.resetDocketsModel();
            $scope.availableStates = Dockets.getStates();
            $scope.availableScopes = Dockets.getScopes();
            //set priority by default to -
            $scope.availablePriorities = Dockets.getPriorities();
            //set default priority to -
            $scope.priority = $scope.availablePriorities[2];
            $scope.dockets.search_scope = $scope.availableScopes[0];

            //get dockets with search parameters
            $scope.searchDockets = function () {

                if ($scope.dockets.from_date && $scope.dockets.to_date) {
                    if (angular.isDate($scope.dockets.from_date)){
                        $scope.dockets.from_date = $scope.dockets.from_date.getDateAsString();
                    }
                    if (angular.isDate($scope.dockets.to_date)){
                        $scope.dockets.to_date = $scope.dockets.to_date.getDateAsString();
                    }
                }

                Dockets.getDockets($scope.dockets).then(function (response) {
                    //sorting on dockets values
                    $scope.results = response.data.dockets;
                    var orderBy = $filter('orderBy');
                    $scope.order = function (predicate, reverse) {
                        $scope.results = orderBy($scope.results, predicate, reverse);
                    };
                    console.log($scope.results);
                });

                $scope.clear = function () {
                    $scope.dockets.from_date = null;
                    $scope.dockets.to_date = null;
                    $scope.dockets.keyword = null;
                    $scope.dockets.states = [];
                    $scope.dockets.search_scope = $scope.availableScopes[0];
                    $scope.priority = null;
                    $scope.results = null;
                    $scope.moduleState = 'list'
                };

                //$scope.dockets = Dockets.getDockets;
                //$scope.school = $http({method: 'GET', url: apiUrl + '/schools/1', params: {access_token: User.access_token, email: User.email}});
            }
        }]
);

powersuiteControllers.controller('FavouritesCtrl',
    function ($scope) {

    }
);

powersuiteControllers.controller('DatePickerCtrl', function ($scope) {
    $scope.today = function () {
        $scope.to_date = new Date();
        $scope.from_date = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.to_date = null;
        $scope.from_date = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd'];
    $scope.format = $scope.formats[4];
});

