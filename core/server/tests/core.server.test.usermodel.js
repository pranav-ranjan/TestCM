/*jslint node:true */
/*global describe:true*/
/*global beforeEach:true*/
/*global it:true*/
/*global afterEach:true*/

'use strict';
var app = require('../../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
var user;

describe('Testing the user methods',
    function () {
        beforeEach(function (done) {
            console.log('test before function');
            user = new User({ firstName: 'fn', lastName: 'ln', displayName: 'dispName', email: 'test@test.com', username: 'username', password: 'password', provider:'localtest' });
            done();
        });
        it('Should be able to save without problems',
            function (done) {
                console.log('test first function');
                user.save(done);
            });

        it('Should not be able to save a user without a name',
            function (done) {
                console.log('test second function');
    
                user.firstName = '';
                user.save(
                    function (err) {
                        //console.log(err);
                        if(!err) throw err;
                        done();
                    }
                );
            });
    
        afterEach(function (done) {
            console.log('test after  function');
    
            user.remove(function () {
                done();
            });
        });
    });

    
    

    

