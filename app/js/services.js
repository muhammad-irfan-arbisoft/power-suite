'use strict';

/* Services */

var powersuiteService = angular.module('powersuiteServices', ['ngResource', 'ngRoute']);

powersuiteService.constant('url', 'http://localhost:3000/');
powersuiteService.constant('apiUrl', 'http://localhost:3000/api/v1');
powersuiteService.constant('docketsUrl', 'http://aeedocketapi-staging.appspot.com/dockets');

powersuiteService.factory('User', function () {
    var user = {
        email: 'virtuoso.irfan@gmail.com',
        access_token: 'CAAH2XfiyuVgBAKoovNarEBLzaN7ZAJKVrcqcqEnJKreLgZC2SoepditLlSX8zmnZAWJ0dCXavdTekZBbAMcP5oLMssJnICoZB6d5MWmR9AHzJDKM7TIJM9ZA0gRIs5ySjqdivyDaT13ZBUxzDgaLnZCZA3q5xt3634TdavBwFqknBd7exKQr0yzsOzh1ikcGT5OYGykIzQZCcfxET1GBZBgclJUqogT4AOP8mZAsOUc52hAwa3nZAF9OSdEpZBfoDiiyPcU8jUPWINnmxfoVbuFrmj4DPL'
    };
    return user;
});

powersuiteService.service('Dockets', function ($http, apiUrl, docketsUrl, User) {

    this.getDockets = function(dockets){
        var states = _.chain(dockets.states).map(function(state){return state.code;}).first().value();
        return $http.get(docketsUrl + '?' , {params: {api_key: 'd4dc4045dd431d43b317190a41b982aa', "states[]": states, keyword_scope: dockets.search_scope.code, direction:'desc', q: dockets.keyword, filed_on_after: dockets.to_date, filed_on_before: dockets.from_date}})
            .success(function(data, status, headers, config){
                return data;
            }).error(function(data, status, headers, config){
                return data;
            });
    };
    this.getDocketFilings = function(docket){
        return $http.get(docketsUrl + '/' + docket.id, {params: {api_key: 'd4dc4045dd431d43b317190a41b982aa'}})
            .success(function(data, status, headers, config){
                return data;
            }).error(function(data, status, headers, config){
                return data;
            });

    };

    //var school = $resource(apiUrl + '/schools/1',  {access_token: User.access_token, email: User.email});
    this.getSchool = function(){
        return $http.get(apiUrl + '/schools/1' , {params: {access_token: User.access_token, email: User.email}})
        .success(function(data, status, headers, config){
            return data;
        }).error(function(data, status, headers, config){
            return data;
        });
    };
    this.getStates = function(){
        return [
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
    };
    this.getScopes = function () {
        return  [
            {name: 'All Content', code: 'all'},
            {name: 'Metadata Only', code: 'meta-data'},
            {name: 'Docket Number', code: 'state-id'},
            {name: 'Major Parties', code: 'major-party'}
        ];
    };

    this.resetDocketsModel = function(){
        return {
            to_date: null,
            from_date: null,
            states: [],
            keyword: null,
            search_scope: [{name: null, code: null}]
        };
    };

    this.getPriorities = function(){
        return [
            {name: 'Low'},
            {name: 'High'},
            {name: ' - '}
        ];
    }
});
