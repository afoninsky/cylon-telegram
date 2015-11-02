'use strict';

var Adaptor = require('../lib/adaptor'),
    Driver = require('../lib/driver'),
    index = require('../index');


describe('index', function() {
  describe('#adaptors', function() {
    it('is an array of supplied adaptors', function() {
      expect(index.adaptors).to.be.eql(['telegram']);
    });
  });

  describe('#drivers', function() {
    it('is an array of supplied drivers', function() {
      expect(index.drivers).to.be.eql(['telegram']);
    });
  });

  describe('#driver', function() {
    it('returns an instance of the Driver', function() {
      expect(index.driver({
        connection: index.adaptor({ robot: {} })
      })).to.be.instanceOf(Driver);
    });
  });

  describe('#adaptor', function() {
    it('returns an instance of the Adaptor', function() {
      expect(index.adaptor({ robot: {} })).to.be.instanceOf(Adaptor);
    });
  });
});
