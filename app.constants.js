(function(){
	'use strict';
	/**
	 * This template is used for creating app.constants.js, this file is used for creating the module app.constants
	 */
	angular.module('app.constants',[])
		.constant('BASE_URL','{MOCKS_BACKEND_URL}')
		.constant('REQUEST_TIMEOUT', {MOCKS_DEFAULT_TIMEOUT});
		
	angular.module('app.constants').value('PaginationConstants', {MAX_SIZE: 5, ITEMS_PER_PAGE: 10});
})();