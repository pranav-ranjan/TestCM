/*jslint node:true */
'use strict';
var app = require('../../../server.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Customer = mongoose.model('Customer');
    
var user, customer;
var cookie;
describe('Customer Controller Unit Tests:',
    function () {
    beforeEach(function (done) {
            console.log("beforeEach - Will call login");
            request(app)
                .post('/api/users/signin')
                .send({ username: 'p.i@123.com', password: '123456' })
                .expect(200)
                .end(onResponse);

            function onResponse(err, res) {
               
               if (err) return done(err);
                cookie = res.headers['set-cookie'];
               return done();
            }
        });
    
        it('Should be able to get the list of customers',
            function (done) {
                request(app)
                    .get('/api/customers/currentPage/1/pageSize/10/sortBy/name/direction/true')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .set('cookie', cookie)
                    .expect(200)
                    .end(function (err, res) {
                        //debugger;
                        
                        if(err){
                            //console.log(err);
                            done(err);
                        }
                        else {
                            //console.log(res);
                            
                            res.body.customers.should.be.instanceof(Array).and.have.lengthOf(10);
                            done();
                        }
                    });
            });

        
    
        afterEach(function (done) {
            request(app)
                .post('/api/users/signout')
                .expect(200)
                .end(onResponse);

            function onResponse(err, res) {
               console.log("In signout");
               //console.log(err);
               if (err) return done(err);
                
               return done();
            }
        });
    });

    
    

    

