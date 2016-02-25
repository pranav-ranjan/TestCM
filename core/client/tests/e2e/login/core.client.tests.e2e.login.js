var root='http://localhost:8080/index.html#/';
describe('Login E2E Tests:', function() {
  
  describe('Search Customers Page', function() {
    it('Should not be able to search customers without login', function() {
      browser.get(root + 'home');
      expect(browser.getLocationAbsUrl()).toMatch('/login/'); 
    });
    it('Should not be able to login with incorrect password', function() {
      browser.get(root +'login');
        element(by.model('email')).sendKeys('p.i@123.com');
        element(by.model('password')).sendKeys('1234567');
        element(by.css('[data-ng-click="login()"]') ).click();
       // browser.pause();

        expect(element(by.id('errorStatusMessage')).getText()).toEqual('Unauthorized');
       
        expect(browser.getLocationAbsUrl()).toMatch('/login'); 
     });
     it('Should be able to login with correct user name and password', function() {
      browser.get(root +'login');
        element(by.model('email')).sendKeys('p.i@123.com');
        element(by.model('password')).sendKeys('123456');
       element( by.css('[data-ng-click="login()"]') ).click();
      expect(browser.getLocationAbsUrl()).toMatch('/home'); 
    });
  });
});
