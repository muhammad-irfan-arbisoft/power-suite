'use strict';

/* Controllers */

var powersuiteControllers = angular.module('powersuiteControllers', []);

powersuiteControllers.controller('SearchCtrl', ['$scope', '$http', '$filter', 'apiUrl', 'User', 'Dockets',
        function ($scope, $http, $filter, apiUrl, User, Dockets) {
            console.log($scope);
            Date.prototype.getDateAsString = function (date) {
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd = date.getDate().toString();
                return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); // padding
            };
            // var d = new Date();
            //d.getDateAsString();
             //results: 2015-04-20

            $scope.dockets = {to_date: null, from_date: null, states: [], keyword: null, scope: null};

            $scope.availableStates = ['Alaska','Alabama','Arizona','Arkansas','California','Colorado','Connecticut','Delaware', 'District of Columbia','Florida', 'Georgia','Hawaii','Idaho', 'Illinois', 'Indiana',
            'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine'];

            $scope.states = {};
            //set priority by default to -
            $scope.priorities = [
                {name: 'Low'},
                {name: 'High'},
                {name: ' - '}
            ];
            //set default priority to -
            $scope.priority = $scope.priorities[2];

            //get dockets with search parameters
            $scope.searchDockets = function () {
                //Dockets.getSchool($scope.dockets).then(function (response) {
                //    $scope.school = response.data;
                //    console.log($scope.school);
                //});
                $scope.dockets.from_date = $scope.dockets.from_date.getDateAsString($scope.dockets.from_date);
                $scope.dockets.to_date = $scope.dockets.to_date.getDateAsString($scope.dockets.to_date);
                Dockets.getDockets($scope.dockets).then(function (response) {
                    //sorting on dockets values
                    $scope.dockets = response.data.dockets;
                    var orderBy = $filter('orderBy');
                    $scope.order = function (predicate, reverse) {
                        $scope.dockets = orderBy($scope.dockets, predicate, reverse);
                    };
                    console.log($scope.dockets);
                });

                //sorting on name, phone and age
                var orderBy = $filter('orderBy');
                $scope.friends = [
                    {name: 'John', phone: '555-1212', age: 10},
                    {name: 'Mary', phone: '555-9876', age: 19},
                    {name: 'Mike', phone: '555-4321', age: 21},
                    {name: 'Adam', phone: '555-5678', age: 35},
                    {name: 'Julie', phone: '555-8765', age: 29}
                ];
                $scope.order = function (predicate, reverse) {
                    $scope.friends = orderBy($scope.friends, predicate, reverse);
                };
                $scope.order('-age', false);
                //$scope.dockets = Dockets.getDockets;
                //$scope.school = $http({method: 'GET', url: apiUrl + '/schools/1', params: {access_token: User.access_token, email: User.email}});
                //$scope.dockets = {
                //    state: 10,
                //    word: "SEARCH",
                //    to_date: new Date(2015, 3, 12),
                //    from_date: new Date(2015, 3, 15)
                //};
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

