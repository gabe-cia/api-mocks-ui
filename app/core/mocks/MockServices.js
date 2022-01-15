(function() {
    'use strict';

    /* 
    * Service responsible for providing services operations for mock entities
    */
    angular.module('app.core.mocks').service('MockServices', MockServices);

    /* Dependency Injection */
    MockServices.$inject = ['RESTServiceManager'];

    /**
     * Service responsible for dealing with mocks 
     */
    function MockServices(RESTServiceManager) {
        /**
         * Get all mocks
         * 
         * @returns {Promise} a promise with success and error methods using function(data, status, headers, config)
         */
        this.getAllMocks = function () {
            return RESTServiceManager.performRequest('GET', '/api-mocks/v1/mocks', undefined, undefined);
        };

        /**
         * Get a mock by its identifier
         * 
         * @param {integer} the mock's identifier
         * @returns {Promise} a promise with success and error methods using function(data, status, headers, config)
         */
        this.getMockById = function (id) {
            return RESTServiceManager.performRequest('GET', '/api-mocks/v1/mocks', [id], undefined);
        };

        /**
         * Create a new mock
         * 
         * @param {object} the mock object to be created
         * @returns {Promise} a promise with success and error methods using function(data, status, headers, config)
         */
        this.createMock = function (mock) {
            return RESTServiceManager.performRequest('POST', '/api-mocks/v1/mocks', undefined, mock);
        };

        /**
         * Update a given mock by its identifier
         * 
         * @param {integer} the mock's identifier
         * @param {object} the mock object to be created
         * @returns {Promise} a promise with success and error methods using function(data, status, headers, config)
         */
        this.updateMock = function (id, mock) {
            return RESTServiceManager.performRequest('PUT', '/api-mocks/v1/mocks', [id], mock);
        };

        /**
         * Delete a mock by its identifier
         * 
         * @param {integer} the mock's identifier
         * @returns {Promise} a promise with success and error methods using function(data, status, headers, config)
         */
        this.deleteMock = function (id) {
            return RESTServiceManager.performRequest('DELETE', '/api-mocks/v1/mocks', [id], undefined);
        };
    }
})();

