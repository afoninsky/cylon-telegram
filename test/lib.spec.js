'use strict';

var Cylon = require('cylon'),
    Driver = require('../lib/driver'),
    Adaptor = require('../lib/adaptor'),
    fs = require('fs'),
    _ = require('lodash'),
    config = require('config');

var _switchBin;
function switchBin (adaptor, value) {
  if(value) {
    _switchBin = adaptor.cfg.apcaccessBinary;
    adaptor.cfg.apcaccessBinary = value;
  } else {
    adaptor.cfg.apcaccessBinary = _switchBin;
  }
}

describe('Adaptor', function() {
  var adaptor = new Adaptor();

  it('is a Cylon adaptor', function() {
    expect(adaptor).to.be.an.instanceOf(Cylon.Adaptor);
  });

  it('connect to wrong place', function(done) {
    var apcupsdEventFile = adaptor.cfg.apcupsdEventFile;
    adaptor.cfg.apcupsdEventFile = null;
    adaptor.connect(function (err) {
      expect(err).to.be.instanceof(Error);
      adaptor.cfg.apcupsdEventFile = apcupsdEventFile;
      done();
    });
  });

  it('connect', function(done) {
    adaptor.connect(done);
  });

  it('ensure robot info filled after connect', function (done) {
    adaptor.connect(function (err) {
      var stat = adaptor.stat;
      expect(stat).to.be.a.instanceof(Object);
      expect(stat.MODEL).to.equal('Back-UPS 350');
      done(err);
    });
  });

  it('get UPS state', function (done) {
    adaptor.getState().then(function (info) {
      expect(info).to.be.a.instanceof(Object);
      expect(info.MODEL).to.equal('Back-UPS 350');
      done();
    }).catch(done);
  });

  it('handle event "power" off', function (done) {
    adaptor.once('power', function (isOn) {
      expect(isOn).to.equal(false);
      done();
    });
    fs.appendFileSync(config.apcupsdEventFile, "1 2 3 4 5 Power failure 5 4 3 2 1\n");
  });

  it('handle event "power" on', function (done) {
    adaptor.once('power', function (isOn) {
      expect(isOn).to.equal(true);
      done();
    });
    fs.appendFileSync(config.apcupsdEventFile, "1 2 3 4 5 Power is back 5 4 3 2 1\n");
  });

  it('test states change', function (done) {
    var states = _.clone(adaptor.states),
        flag = 0;

    var expectedStates = {
      power: false,
      charge: 50,
      timeleft: 41
    };

    expect(states.power).to.equal(true);
    expect(states.charge).to.equal(100);
    expect(states.timeleft).to.equal(43);

    switchBin(adaptor, './test/apcaccess.updated');

    function ensureExact (event) {
      return function (current, prev) {
        expect(states[event]).to.equal(prev);
        expect(adaptor.states[event]).to.equal(current);
        if(++flag === 4) { flag = 0; done(); }
      };
    }

    adaptor.events.forEach(function (event) {
      adaptor.once(event, ensureExact(event));
    });

    adaptor.checkEvents().then(function () {

      _.each(expectedStates, function (v, k) {
        expect(adaptor.states[k]).to.equal(v);
      });

      switchBin(adaptor);
      if(++flag === 4) { flag = 0; done(); }
    }).catch(done);

  });

  it('disconnect', function(done) {
    adaptor.disconnect(done);
  });


  after('empty log', function () {
    fs.truncateSync(config.apcupsdEventFile, 0);
  });

});


describe('Driver', function() {
  var adaptor = new Adaptor(),
  driver = new Driver({
    connection: adaptor
  });

  it('is a Cylon driver', function() {
    expect(driver).to.be.an.instanceOf(Cylon.Driver);
  });

  it('start driver', function(done) {
    driver.start(done);
  });

  _.each(driver.commands, function (func, name) {
    func = func.bind(driver);
    it('test command ' + name, function(done) {
      func(done);
    });
  });

  _.each(driver.events, function (name) {
    it('test event ' + name, function(done) {
      driver.once(name, function () {
        done();
      });
      adaptor.emit(name);
    });
  });

  it('stop driver', function(done) {
    driver.halt(done);
  });

});
