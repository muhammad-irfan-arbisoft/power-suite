'use strict';

/* Controllers */

var powersuiteControllers = angular.module('powersuiteControllers', []);

powersuiteControllers.controller('SearchCtrl', ['$scope', '$http', '$filter', 'apiUrl', 'User', 'Dockets',
        function ($scope, $http, $filter, apiUrl, User, Dockets) {

            Date.prototype.getDateAsString = function () {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd = this.getDate().toString();
                return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); // padding
            };

            $scope.dockets = {
                to_date: null,
                from_date: null,
                states: [{name: null, code:null}],
                keyword: null,
                search_scope: [{name: null, code: null}]
            };

            $scope.availableStates = [
                {name: 'Alaska', code: 'AL'},
                {name: 'Alabama', code: ''},
                {name: 'Arizona', code: ''},
                {name: 'Arkansas', code: ''},
                {name: 'California', code: ''},
                {name: 'Colorado', code: ''},
                {name: 'Connecticut', code: ''},
                {name: 'Delaware', code: ''},
                {name: 'District of Columbia', code: ''},
                {name: 'Florida', code: ''},
                {name: 'Georgia', code: ''},
                {name: 'Hawaii', code: ''},
                {name: 'Idaho', code: ''},
                {name: 'Illinois', code: ''},
                {name: 'Indiana', code: ''},
                {name: 'Iowa', code: ''},
                {name: 'Kansas', code: ''},
                {name: 'Kentucky', code: ''},
                {name: 'Louisiana', code: ''},
                {name: 'Maine', code: ''}
            ];

            $scope.availableScopes = [
                {name: 'All Content', code: 'all'},
                {name: 'Metadata Only', code: 'meta-data'},
                {name: 'Docket Number', code: 'state-id'},
                {name: 'Major Parties', code: 'major-party'}
            ];

            //set priority by default to -
            $scope.priorities = [
                {name: 'Low'},
                {name: 'High'},
                {name: ' - '}
            ];
            //set default priority to -
            $scope.priority = $scope.priorities[2];
            $scope.dockets.search_scope = $scope.availableScopes[0];

            //get dockets with search parameters
            $scope.searchDockets = function () {
                var from_date = $scope.dockets.from_date;
                var to_date = $scope.dockets.to_date;

                if (from_date && to_date) {
                    $scope.dockets.from_date = from_date.getDateAsString();
                    $scope.dockets.to_date = to_date.getDateAsString();
                }

                Dockets.getDockets($scope.dockets).then(function (response) {
                    //sorting on dockets values
                    $scope.dockets = response.data.dockets;
                    var orderBy = $filter('orderBy');
                    $scope.order = function (predicate, reverse) {
                        $scope.dockets = orderBy($scope.dockets, predicate, reverse);
                    };
                    console.log($scope.dockets);
                });

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

