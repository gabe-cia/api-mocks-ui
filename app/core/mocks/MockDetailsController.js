(function () {
    'use strict';

    /**
     * Controller responsible for manipulating maintain context view
     *
     * @param {!angular.Scope} $scope Angular scope service
     * @param {!angular.Location} $location Angular $location wrapper
     * @param {!angular.RouteParams} $routeParams Angular routeParams service
     * @param {AngularJS-Toaster} toaster Angular thirty party module
     * @param {!angular.Filter} $filter Angular filter service
     * @param {!m4admin.controllers.ContextServices} ContextServices context services
     */
    angular.module('app.core.mocks').controller('MockDetailsController', MockDetailsController);

    // Dependency Injection
    MockDetailsController.$inject = ['$scope', '$location', '$routeParams', '$modal', 'toaster', '$filter', 'MockServices'];

    // Controller implementation  
    function MockDetailsController($scope, $location, $routeParams, $modal, toaster, $filter, MockServices) {
        $scope.operationIdentification = undefined;
        $scope.methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
        $scope.contentTypes = [
            {val: "", type: " --- "},
            {val: "JSON", type: "application/json"},
            {val: "XML", type: "text/xml"},
            {val: "AXML", type: "application/xml"},
            {val: "PLAIN_TEXT", type: "text/plain"},
        ]
        $scope.mock = {
            id: undefined,
            name: undefined,
            basePath: undefined,
            operations: []
        };
        $scope.newOperation = {
            id: undefined,
            method: undefined,
            path: undefined,
            scenarios: [{
                name: "Default",
                conditions: undefined,
                httpCode: 200,
                order: 1,
                contentType: null,
                body: "",
                headers: {},
                default: true
            }]
        };
        $scope.newScenario = {
            id: undefined,
            name: undefined,
            conditions: undefined,
            httpCode: 200,
            contentType: null,
            body: undefined,
            default: false,
            headers: []
        };

        /**
         * Getting the mock information to populate the form
         */
        $scope.getMockInfo = function () {
            var id = $routeParams.id;
            if (id) {
                // call the get a mock by its identifier
                $scope.promise = MockServices.getMockById(id);

                //callback in case of success to retrieve the character list
                var successCallback = function (response) {
                    // get answer from response
                    $scope.mock = response.data;
                    if($routeParams.op == "clone") {
                        // in case this is a clone operation, we should remove all
                        // identifiers from the clonned entity and enhance the
                        // mock name and base path in order to avoid conflicts
                        $scope.mock.id = undefined;
                        $scope.mock.operations.forEach(op => op.id = undefined);
                        $scope.mock.name += " (2)"; 
                        $scope.mock.basePath += "/2"; 

                        // setting the breadcrumb label as Clone
                        $scope.operationIdentification = "general.breadcrumb.clone";
                    } else {
                        // setting the breadcrumb label the mock name
                        $scope.operationIdentification = $scope.mock.name;
                    }
                };

                //callback in case of failure to fetch the list of characters
                var errorCallback = function (response) {
                    if (response.status > 0) {
                        toaster.pop('error', '', $filter('translate')('mockDetails.errorMessage.loadMockInformationFailure'));
                    } else {
                        toaster.pop('error', '', $filter('translate')('general.errorMessage.timeout'));
                    }
                };

                // Resolve promise
                $scope.promise.then(successCallback, errorCallback);
            } else {
                // setting the breadcrumb label as New
                $scope.operationIdentification = "general.breadcrumb.new";
            }
        };

        /*
         * Operation handling function
         */
        $scope.saveMock = function () {
            // checking if we are handling with an edit or a create/clone operation
            if($routeParams.op == "edit") {
                $scope.promise = MockServices.updateMock($routeParams.id, $scope.mock);
            } else {
                $scope.promise = MockServices.createMock($scope.mock);
            }
            var successCallback = () => { $location.path( '/mocks/search') };
            var errorCallback = () => {toaster.pop('error', '', $filter('translate')('mockDetails.errorMessage.saveMockInformationFailure'))};

            // Resolve promise
            $scope.promise.then(successCallback, errorCallback);
        };

        /**
         * Sending the user back to Search Mock page
         */
        $scope.backToSearch = function() {
            $location.path( '/mocks/search');
        };

        /*
         * Operation handling function
         */
        $scope.addOperation = function() {
            $scope.modalTitle = $filter('translate')('mockDetails.operation.modal.title');

            // cloning the new operation model and assigning it to our operation in scope
            $scope.editOperation = angular.copy($scope.newOperation);

            // opening the operation modal
            $scope.modalInstance = $modal.open({
                animation: true,
                scope: $scope,
                templateUrl: 'common/templates/operation-modal.html'
            });

            // handling the operation modal options
            $scope.modalInstance.result.then(() => {
                // checking if the created operation does not conflicts with a previously created one
                if($scope.mock.operations.some(a => a.method == $scope.editOperation.method 
                    && a.path == $scope.editOperation.path)) {
                    toaster.pop('error', '', $filter('translate')('mockDetails.errorMessage.duplicateMethodPath'))
                } else {
                    $scope.mock.operations.push(angular.copy($scope.editOperation));
                }
            });
        };

        $scope.updateOperation = function(operation) {
            $scope.modalTitle = $filter('translate')('mockDetails.operation.modal.title');

            // cloning the edit operation in order to avoid it to be modified
            // in case the user closes the modal before saving it 
            $scope.editOperation = Object.assign({}, operation);

            // oepning the operation modal
            $scope.modalInstance = $modal.open({
                animation: true,
                scope: $scope,
                templateUrl: 'common/templates/operation-modal.html'
            });

            // handling the operation modal options
            $scope.modalInstance.result.then(() => {
                // checking if the created operation does not conflicts with a previously created one
                if($scope.mock.operations.some(a => (a.method == $scope.editOperation.method 
                    && a.path == $scope.editOperation.path) && a !== operation)) {
                    toaster.pop('error', '', $filter('translate')('mockDetails.errorMessage.duplicateMethodPath'))
                } else {
                    operation.method = $scope.editOperation.method;
                    operation.path = $scope.editOperation.path;
                    operation.id = $scope.editOperation.id;
                }
            });
        };

        $scope.removeOperation = function(operation) {
            $scope.mock.operations = $scope.mock.operations.filter(op => op != operation);
        };

        /*
         * Scenario handling function
         */
        $scope.addScenario = function(operation) {
            $scope.modalTitle = $filter('translate')('mockDetails.operation.modal.title');
            $scope.editScenario = angular.copy($scope.newScenario);

            $scope.modalInstance = $modal.open({
                animation: true,
                scope: $scope,
                templateUrl: 'common/templates/scenario-modal.html'
            });
            $scope.modalInstance.result.then(() => {
                $scope.editScenario.order = operation.scenarios.length + 1;
                $scope.editScenario.headers = $scope.editScenario.headers
                    .reduce((headers, header) => headers[header.key] = header.value, {});

                operation.scenarios.push(angular.copy($scope.editScenario));
            });
        };

        $scope.updateScenario = function(scenario) {
            $scope.modalTitle = $filter('translate')('mockDetails.scenario.modal.title');
            $scope.editScenario = Object.assign({}, scenario);
            var headers = [];
            for(var i in $scope.editScenario.headers) {
                headers.push({key: i, val: $scope.editScenario.headers[i]});
            }
            $scope.editScenario.headers = headers;

            $scope.modalInstance = $modal.open({
                animation: true,
                scope: $scope,
                templateUrl: 'common/templates/scenario-modal.html'
            });
            $scope.modalInstance.result.then(() => {
                scenario.name = $scope.editScenario.name;
                scenario.conditions = $scope.editScenario.conditions;
                scenario.httpCode = $scope.editScenario.httpCode;
                scenario.body = $scope.editScenario.body;
                scenario.contentType = $scope.editScenario.contentType;

                var headers = {};
                $scope.editScenario.headers.forEach(h => headers[h.key] = h.val);
                scenario.headers = headers;
            });
        };

        $scope.removeScenario = function(operation, scenario) {
            operation.scenarios = operation.scenarios.filter(sc => sc != scenario);
        };

        /**
         * Handling scenario positions
         */
        $scope.sendUp = function(operation, index) {
            operation.scenarios = operation.scenarios.sort((a,b) => a.order - b.order);
            operation.scenarios[index].order -= 1;
            operation.scenarios[index - 1].order += 1;
        };

        $scope.sendDown = function(operation, index) {
            operation.scenarios = operation.scenarios.sort((a,b) => a.order - b.order);
            operation.scenarios[index].order += 1;
            operation.scenarios[index + 1].order -= 1;
        };

        /**
         * Handling headers
         */
        $scope.removeHeader = function(scenario, header) {
            scenario.headers = scenario.headers.filter(h => h !== header)
        }

        $scope.addHeader = function(scenario) {
            scenario.headers.push({key: "", val: ""});
        }
    }
})();