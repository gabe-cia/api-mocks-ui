(function () {
    'use strict';
    // define application routes
    angular.module('app').config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                    .when('/home', {
                        templateUrl: "home.html",
                        controller : "HomeController"
                    })
                    .when('/accessDenied', {
                        templateUrl: "accessDenied.html"
                    })

                    // Mocks Routes
                    .when('/mocks/search', {
                        templateUrl: "core/mocks/searchMocks.html",
                        controller : "SearchMocksController"
                    })
                    .when('/mocks/:id/details', {
                        templateUrl: "core/mocks/mockDetails.html",
                        controller : "MockDetailsController",
                        resolve: {
                            test: ($route) => { $route.current.params.op = "edit" }
                        }
                    })
                    .when('/mocks/:id/clone', {
                        templateUrl: "core/mocks/mockDetails.html",
                        controller : "MockDetailsController",
                        resolve: {
                            test: ($route) => { $route.current.params.op = "clone" }
                        }
                    })
                    .when('/mocks/create', {
                        templateUrl: "core/mocks/mockDetails.html",
                        controller : "MockDetailsController",
                        resolve: {
                            test: ($route) => { $route.current.params.op = "create" }
                        }
                    })

                    // Otherwise, we should redirect the user to home page
                    .otherwise({
                        redirectTo : '/'
                    });
                }]);
})();
