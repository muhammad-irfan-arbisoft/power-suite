'use strict';

/* Controllers */

var powersuiteControllers = angular.module('powersuiteControllers', []);

powersuiteControllers.controller('SearchCtrl', ['$scope', '$http', '$filter', 'apiUrl', 'User', 'Dockets',
        function ($scope, $http, $filter, apiUrl, User, Dockets) {

            Date.prototype.getDateAsString = function () {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd = this.getDate().toString();
                return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
            };
            $scope.results = null;
            $scope.dockets = {
                to_date: null,
                from_date: null,
                states: [],
                keyword: null,
                search_scope: [{name: null, code: null}]
            };

            $scope.availableStates = [
                {name: 'Alaska', code: 'AL'},
                {name: 'Alabama', code: null},
                {name: 'Arizona', code: null},
                {name: 'Arkansas', code: null},
                {name: 'California', code: null},
                {name: 'Colorado', code: null},
                {name: 'Connecticut', code: null},
                {name: 'Delaware', code: null},
                {name: 'District of Columbia', code: null},
                {name: 'Florida', code: null},
                {name: 'Georgia', code: null},
                {name: 'Hawaii', code: null},
                {name: 'Idaho', code: null},
                {name: 'Illinois', code: null},
                {name: 'Indiana', code: null},
                {name: 'Iowa', code: null},
                {name: 'Kansas', code: null},
                {name: 'Kentucky', code: null},
                {name: 'Louisiana', code: null},
                {name: 'Maine', code: null}
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

                if ($scope.dockets.from_date && $scope.dockets.to_date) {
                    $scope.dockets.from_date = $scope.dockets.from_date.getDateAsString();
                    $scope.dockets.to_date = $scope.dockets.to_date.getDateAsString();
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

                $scope.clear = function(){
                    $scope.dockets.from_date = null;
                    $scope.dockets.to_date = null;
                    $scope.dockets.keyword = null;
                    $scope.dockets.states = [];
                    $scope.dockets.search_scope = $scope.availableScopes[0];
                    $scope.priority = null;
                    $scope.results = null;
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

