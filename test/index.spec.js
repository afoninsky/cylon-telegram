'use strict';

var Adaptor = require('../lib/adaptor'),
    index = require('../index');


describe('index', function() {
  describe('#adaptors', function() {
    it('is an array of supplied adaptors', function() {
      expect(index.adaptors).to.be.eql(['telegram']);
    });
  });


  describe('#adaptor', function() {
    it('returns an instance of the Adaptor', function() {
      expect(index.adaptor({ robot: {} })).to.be.instanceOf(Adaptor);
    });
  });
});
