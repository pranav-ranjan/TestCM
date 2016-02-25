(function(){
'use strict';
var customersFactory=function($http)
  {

    var factory = {};
    factory.doTest=function(){
      return $http.get('/api/customerstest');
    };

    factory.getCustomer=function(id){
      return $http.get('/api/customers/' + id);
    };

    factory.getCustomers=function(text,currentPage,pageSize,sortBy,direction){
      if(text === ''){
        return $http.get('/api/customers/'+'currentPage/'+currentPage+'/pageSize/'+pageSize+'/sortBy/'+sortBy+'/direction/'+direction);
      }
      return $http.get('/api/customers/'+'currentPage/'+currentPage+'/pageSize/'+pageSize+'/sortBy/'+sortBy+'/direction/'+direction+'/searchText/'+text);
      //return $http.get('/api/customers/'+currentPage+'/'+pageSize);
      //return $http.get('/api/customers');

    };
    return factory;
  };
  customersFactory.inject=['$http'];
  angular.module('customersApp').factory('customersFactory',customersFactory);
}());
