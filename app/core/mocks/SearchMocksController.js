(function(){
    'use strict';
    
    /**
     * Controller responsible to handle functionalites related to the mocks search UI
     * 
     * @param {!angular.Scope} $scope Angular scope service
     * @param {AngularJS-Toaster} toaster Angular thirty party module
     * @param {!angular.$filter} $filter Angular $filter service
     * @param {!angular.$location} $location Angular $location wrapper
     * @param {Angular-UI-Modal} $modal angular-ui wrapper for bootstrap modal
     * @param {!app.core.mocks.MockServices} MockServices application mock services
     * @param {!app.constants.PaginationConstants} PaginationConstants which contains the application's constants
     */
    angular.module('app.core.mocks').controller('SearchMocksController', SearchMocksController);
    
    // Dependency Injection
    SearchMocksController.$inject = ['$scope', 'toaster','$filter','$location', '$modal', 'MockServices', 'PaginationConstants'];
   
    // Controller Implementation
    function SearchMocksController($scope, toaster, $filter, $location, $modal, MockServices,  PaginationConstants){
        // initialize all variables need to put this working
        $scope.mockList = [];
        $scope.promise = undefined;
        
        // Pagination and search variables
        $scope.preparedMockList = [];
        $scope.mockNameToSearch = '';
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = PaginationConstants.ITEMS_PER_PAGE;
        $scope.maxSize = PaginationConstants.MAX_SIZE;
        
        /**
         * Function responsible for preparing the mock list to show it in the paginated table
         * It will - filter the mockList by the search field
         * 		   - order the result of the filter by partnerName
         *         - return the sliced result to show it paginated
         * 
         * @returns {list} filtered and paginated list of mocks
         */
        $scope.getPreparedMockList = function() {
            $scope.preparedMockList = $filter('filter')($scope.mockList, {name: $scope.mockNameToSearch});
            $scope.preparedMockList = $filter('orderBy')($scope.preparedMockList, 'name');

            $scope.totalItems = $scope.preparedMockList.length;  
                
            return $scope.preparedMockList.slice(($scope.currentPage-1) * $scope.itemsPerPage, (($scope.currentPage-1) * $scope.itemsPerPage) + $scope.itemsPerPage);
        };

        /**
         * Function responsible for getting all mocks
         */
        $scope.getAllMocks = function() {
            // call the get all mocks method from service
            $scope.promise = MockServices.getAllMocks();
            
            //callback in case of success to retrieve the mock list
            var successCallback = function(response) {
                // get answer from response
                $scope.mockList = response.data;
            };

            //callback in case of failure to fetch the list of mocks
            var errorCallback = function(response) {
                if(response.status > 0){
                    toaster.pop('error', '', $filter('translate')('searchMocks.errorMessage.loadMockInformationFailure'));
                } else {
                    toaster.pop('error','', $filter('translate')('general.errorMessage.timeout'));
                }  
            };
        
            // Resolve promise
            $scope.promise.then(successCallback, errorCallback);
        };

        /**
         * Function responsible for redirecting user to create a mock
         */
        $scope.goToCreateMock = function () {
            // redirect user to mock edition
            $location.path( '/mocks/create');
        };

        /**
         * Function responsible for redirecting user to edit a mock
         * 
         * @param {String} id mock identifier to be edited
         */
        $scope.goToMockDetails = function (id) {
            // redirect user to mock edition
            $location.path( '/mocks/' + id + '/details');
        };

        /**
         * Function responsible for redirecting user to clone a mock
         * 
         * @param {String} id mock identifier to be edited
         */
        $scope.goToCloneMock = function (id) {
            // redirect user to mock edition
            $location.path( '/mocks/' + id + '/clone');
        };

        /**
         * Opens a confirmation modal before removing a mock
         * 
         * @param {String} id the mock identifier
         * @param {String} name the mock name
         */
        $scope.openRemoveConfirmationModal = function (id, name) {
            $scope.modalTitle = $filter('translate')('searchMocks.deleteModal.title');
            $scope.modalMessage = $filter('translate')('searchMocks.deleteModal.message').replace("{name}", name);
            $scope.mockToBeDeleted = id;

            $scope.modalInstance = $modal.open({
                animation: true,
                scope: $scope,
                templateUrl: 'common/templates/remove-confirmation.html'
            });
            $scope.modalInstance.result.then($scope.deleteMock);
        };

        /**
         * Function responsible for deleting a mock
         * 
         * @param {String} id mock identifier to be edited
         */
        $scope.deleteMock = function() {
            MockServices.deleteMock($scope.mockToBeDeleted);
            $scope.mockList = $scope.mockList.filter(m => m.id != $scope.mockToBeDeleted);
        };
    }  
})();

