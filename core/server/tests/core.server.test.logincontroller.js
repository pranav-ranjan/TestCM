/*jslint node:true */
/*global describe:true*/
/*global beforeEach:true*/
/*global it:true*/
/*global afterEach:true*/

'use strict';
var app = require('../../../server.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Customer = mongoose.model('Customer');
    
var user, customer;
var cookie;
describe('Login Controller Unit Tests:',
    function () {
        beforeEach(function (done) {
            console.log("beforeEach - Will call login");
            done();
        });
    
        it('Should be able to login',
            function (done) {
                request(app)
                    .post('/api/users/signin')
                    .send({ username: 'p.i@123.com', password: '123456' })
                    .expect(200)
                    .end(onResponse);

                function onResponse(err, res) {
                    if (err) 
                        return done(err);
                    //console.log(res.body);
                    res.body.username.should.equal('p.i@123.com');
                    res.body.email.should.equal('p.i@123.com');
                    res.body.status.should.equal(true);
                    

                    cookie = res.headers['set-cookie'];
                    return done();
                }
        });

    
        afterEach(function (done) {
            request(app)
                .post('/api/users/signout')
                .expect(200)
                .end(onResponse);

            function onResponse(err, res) {
               console.log("In signout");
               //console.log(err);
               if (err) 
                   return done(err);
               return done();
            }
        });
    });

describe('Login Controller Unit Tests for failure:',
    function () {
        beforeEach(function (done) {
            console.log("beforeEach - Will call login");
            done();
        });
    
        it('Should not be able to login with wrong password',
            function (done) {
                request(app)
                    .post('/api/users/signin')
                    .send({ username: 'p.i@123.com', password: 'invalid password' })
                    .expect(401)
                    .end(onResponse);

                function onResponse(err, res) {
            
                 
                    if (err) 
                        return done(err);
                    done();
                }
        });

        it('Should not be able to login with blank name',
            function (done) {
                request(app)
                    .post('/api/users/signin')
                    .send({ username: '', password: '123456' })
                    .expect(400)
                    .end(onResponse);

                function onResponse(err, res) {
                    if (err) 
                        return done(err);
                    done();
                }
        });

    
        afterEach(function (done) {
            done();
        });
    });

    
    

    

