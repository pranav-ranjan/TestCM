
describe('Controller: LoginController', function() {
  var deferredLogin, LoginController,  $rootScope, $provide, $location,  scope, userServiceMock;
  beforeEach(module('customersApp'));

  beforeEach(inject(function($injector,$q) {
      deferredLogin = $q.defer();
    $rootScope=$injector.get('$rootScope');
     $controller=$injector.get('$controller');
    $location=$injector.get('$location');
        
      userServiceMock = {
        login: jasmine.createSpy('login spy')
                      .and.returnValue(deferredLogin.promise)           
        };
      
      
    LoginController=function() {
      return $controller('LoginController', { 
        '$scope': $rootScope,
        '$location': $location,
          userService:userServiceMock
      });
    };
  }));

  //This is success
  it('should have a LoginController controller', function() {
    expect('customersApp.LoginController').toBeDefined();
  });

   it('should make a login call', function() {
    var $scope={};
    var loginCtrl=LoginController();
    loginCtrl.email = 'p.i@123.com';
    loginCtrl.password = '123456';
    $rootScope.login();
    
    //$httpBackend.flush();
    //$rootScope.$digest();
      deferredLogin.resolve(true);  
      $rootScope.$digest();
    expect($location.path()).toBe('/home');
  });
 it('login call should fail', function() {
    var $scope={};
    var loginCtrl=LoginController();
    loginCtrl.email = 'p.i@123.com';
    loginCtrl.password = '123456';
    $rootScope.login();
    
    //$httpBackend.flush();
    //$rootScope.$digest();
      deferredLogin.resolve(false);  
      $rootScope.$digest();
     expect($rootScope.errorMessage).toBe('Unable to login');
     expect($location.path()).toBe('');
  });
  
});

describe('Controller: LoginController2', function() {
  var  LoginController, $httpBackend, $rootScope, $provide, $location,  scope, authRequestHandler;
  beforeEach(module('customersApp'));

  beforeEach(inject(function($injector,$q) {
      deferredLogin = $q.defer();
    $httpBackend=$injector.get('$httpBackend');
    $rootScope=$injector.get('$rootScope');
     $controller=$injector.get('$controller');
    $location=$injector.get('$location');
      authRequestHandler = $httpBackend.when('POST', '/api/users/signin')
            .respond({status:'true',email:'p.i@123.com',sessionID:'1234',username:'p.i@123.com'}, {'A-Token': 'xxx'});

      
    LoginController=function() {
      return $controller('LoginController', { 
        '$scope': $rootScope,
        '$location': $location
      });
    };
  }));

  //This is success
  it('should have a LoginController controller', function() {
    expect('customersApp.LoginController').toBeDefined();
  });

  // You have to think about what you want to test here. There is no logic in your controller
  // that matches what you test here. To activate test just remove the x from xit.
  it('should make a login call', function() {
    var $scope={};
    var loginCtrl=LoginController();
    loginCtrl.email = 'p.i@123.com';
    loginCtrl.password = '123456';
      
    $rootScope.login();
    
    $httpBackend.flush();
    $rootScope.$digest();
      
    expect($location.path()).toBe('/home');
  });
 
   
});