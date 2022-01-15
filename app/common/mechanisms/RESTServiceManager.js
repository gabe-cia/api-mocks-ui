(function () {
  'use strict';

  /**
   * Service responsible for encapsulating M4CE functions
   * @param {!angular.Http} $http Angular http service
   */
  angular.module('app.common.mechanisms').service('RESTServiceManager', function (BASE_URL, $http, REQUEST_TIMEOUT) {

    /**
     * Function responsible for build httpConfig
     *
     * @param {string} method method used by this request (DELETE, GET, PUT, etc)
     * @param {string} api api name to be reached
     * @param {string} params parameter list belonging to the request
     * @param {object} data request´s body
     * @returns {object} httpConfig to be use in $http()
     */
    this.buildHttpConfig = function (method, api, params, data) {
      // build the request configuration
      var config = {
        method: method,
        url: BASE_URL + api,
        timeout: REQUEST_TIMEOUT,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      // in according to the method, param will be added in different ways
      switch (method) {
        case 'GET':
          if (params !== undefined) {
            params.forEach(function (param) {
              config.url = config.url + '/' + param;
            });
          }
          break;
        case 'POST':
          if (params !== undefined) {
            params.forEach(function (param) {
              config.url = config.url + '/' + param;
            });
          }
          config.data = data;
          break;
        case 'PUT':
          if (params !== undefined) {
            params.forEach(function (param) {
              config.url = config.url + '/' + param;
            });
          }
          config.data = data;
          break;
        case 'DELETE':
          if (params !== undefined) {
            params.forEach(function (param) {
              config.url = config.url + '/' + param;
            });
          }
          break;
        case 'PATCH':
          if (params !== undefined) {
            params.forEach(function (param) {
              config.url = config.url + '/' + param;
            });
          }
          config.data = data;
          break;
      }

      return config;
    };

    /**
    * Function responsible for executing a M4CE server request
    *
    * @param {string} method method used by this request (DELETE, GET, PUT, etc)
    * @param {string} api API name to be reached
    * @param {string} params parameter list belonging to the request
    * @param {object} data request´s body
    * @returns {promise} a promise with success and error methods using function(data, status, headers, config)
    */
    this.performRequest = function (method, api, params, data) {
      return $http(this.buildHttpConfig(method, api, params, data));
    };
  });
})();
