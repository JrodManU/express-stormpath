'use strict';

var assert = require('assert');

var express = require('express');

var helpers = require('./helpers');

describe('#init()', function() {
  it('should export stormpath.init when express-stormpath is required', function() {
    assert.doesNotThrow(function() {
      require('../index').init;
    }, Error);
  });

  it('should should emit a stormpath.ready event when ready', function(done) {

    helpers.createApplication(helpers.createClient(), function(err, application) {
      if (err) {
        return done(err);
      }

      var app = helpers.createStormpathExpressApp({ application: { href: application.href } });
      app.on('stormpath.ready', function() {
        done();
      });
    });
  });

  // Can't figure out how to properly test an async throw...
  it.skip('should throw an error when an invalid configuration is supplied', function() {
    var stormpath = require('../index');

    assert.throws(function() {
      var app = express();
      app.use(stormpath.init(app, { application: {}, client: {} }));
    }, Error);
  });

  it('should not throw an error if a valid configuration is supplied', function(done) {

    helpers.createApplication(helpers.createClient(), function(err, application) {
      if (err) {
        return done(err);
      }

      var app = helpers.createStormpathExpressApp({ application: { href: application.href } });
      app.on('stormpath.ready', function() {
        done();
      });
    });
  });
});
