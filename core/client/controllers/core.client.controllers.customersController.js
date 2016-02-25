(function() {

    var CustomersController = function ($scope,$log,$filter,customersFactory,appSettings) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.appSettings = appSettings;
        $scope.totalRecords = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
          $scope.filteredCount = 0;
        $scope.customers = [];
        $scope.filteredCustomers = [];
        $scope.availableSearchParams = [];
        function  getCustomersSummary(text){
          if(text===null ||'undefined'===typeof(text)){
            text = '';
          }

          customersFactory.getCustomers(text,$scope.currentPage-1,$scope.pageSize,$scope.sortBy,$scope.reverse)
            .success(function(response){
              $scope.customers = response.customers;

              $scope.totalRecords = response.count;
              filterCustomers('');
            })
            .error(function(data){
              $log.log(data);
            });
        }
        function filterCustomers(filterText) {
            $scope.filteredCustomers = $filter("nameCityStateFilter")($scope.customers, filterText);
            $scope.filteredCount = $scope.filteredCustomers.length;
        }
        function init(){
          getCustomersSummary();

        }
        init();

        $scope.searchTextChanged = function () {
            filterCustomers($scope.searchText);
        };
        $scope.search = function (text) {
          $scope.currentPage = 1;
          getCustomersSummary(text);
        };
        $scope.pageChanged=function(page){
            $scope.currentPage = page;
            getCustomersSummary($scope.searchText);
        };
        $scope.doSort = function(propName) {
          $scope.currentPage = 1;
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
           getCustomersSummary($scope.searchText);
        };
        $scope.doTest=function(){
          customersFactory.doTest()
          .success(function(data){
            $scope.test = data;
          });
        };

    };

    CustomersController.$inject = ['$scope','$log','$filter','customersFactory','appSettings'];

    angular.module('customersApp')
      .controller('CustomersController', CustomersController);

}());
