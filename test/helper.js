'use strict';

process.env.NODE_ENV = 'test';

var path = require('path'),
    chai = require('chai');

global.chai = chai;
global.expect = chai.expect;

var Cylon = require('cylon');
Cylon.Logger.setup({ logger: false });
