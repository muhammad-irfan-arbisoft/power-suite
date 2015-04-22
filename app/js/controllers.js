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
                {name: 'Alabama', code: 'AL'},
                {name: 'Alaska', code: 'AK'},
                {name: 'Arizona', code: 'AZ'},
                {name: 'Arkansas', code: 'AR'},
                {name: 'California', code: 'CA'},
                {name: 'Colorado', code: 'CO'},
                {name: 'Connecticut', code: 'CT'},
                {name: 'Delaware', code: 'DE'},
                {name: 'Florida', code: 'FL'},
                {name: 'Georgia', code: 'GA'},
                {name: 'Hawaii', code: 'HI'},
                {name: 'Idaho', code: 'ID'},
                {name: 'Illinois', code: 'IL'},
                {name: 'Indiana', code: 'IN'},
                {name: 'Iowa', code: 'IA'},
                {name: 'Kansas', code: 'KS'},
                {name: 'Kentucky', code: 'KY'},
                {name: 'Louisiana', code: 'LA'},
                {name: 'Maine', code: 'ME'},
                {name: 'Maryland', code: 'MD'},
                {name: 'Massachusetts', code: 'MA'},
                {name: 'Michigan', code: 'MI'},
                {name: 'Minnesota', code: 'MN'},
                {name: 'Mississippi', code: 'MS'},
                {name: 'Missouri', code: 'MO'},
                {name: 'Montana', code: 'MT'},
                {name: 'Nebraska', code: 'NE'},
                {name: 'Nevada', code: 'NV'},
                {name: 'New Hampshire', code: 'NH'},
                {name: 'New Jersey', code: 'NJ'},
                {name: 'New Mexico', code: 'NM'},
                {name: 'New York', code: 'NY'},
                {name: 'North Carolina', code: 'NC'},
                {name: 'North Dakota', code: 'ND'},
                {name: 'Ohio', code: 'OH'},
                {name: 'Oklahoma', code: 'OK'},
                {name: 'Oregon', code: 'OR'},
                {name: 'Pennsylvania', code: 'PA'},
                {name: 'Rhode Island', code: 'RI'},
                {name: 'South Carolina', code: 'SC'},
                {name: 'South Dakota', code: 'SD'},
                {name: 'Tennessee', code: 'TN'},
                {name: 'Texas', code: 'TX'},
                {name: 'Utah', code: 'UT'},
                {name: 'Vermont', code: 'VT'},
                {name: 'Virginia', code: 'VA'},
                {name: 'Washington', code: 'WA'},
                {name: 'West Virginia', code: 'WV'},
                {name: 'Wisconsin', code: 'WI'},
                {name: 'Wyoming', code: 'WY'}
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

                $scope.clear = function () {
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

