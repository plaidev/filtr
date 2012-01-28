if (!chai) var chai = require('chai');
var should = chai.should();

if (!filtr) var filtr = require('..');

describe('Query', function () {
  it('should have a version', function () {
    filtr.version.should.match(/^\d+\.\d+\.\d+$/);
  });

  it('should parse a single query', function () {
    var query = { $lt: 10 }
      , Q = filtr(query);
    Q.stack.should.have.length(1);
    Q.test(8, { type: 'single' }).should.be.true;
    Q.test(11, { type: 'single' }).should.be.false;
  });

  it('should parse a lengthed query', function () {
    var query = { $lt: 10, $gt: 5 }
      , Q = filtr(query);
    Q.stack.should.have.length(2);
    Q.test(8, { type: 'single' }).should.be.true;
    Q.test(4, { type: 'single' }).should.be.false;
    Q.test(11, { type: 'single' }).should.be.false;
  });

  it('should parse a nested query', function () {
    var query = { $and: [ { $size: 3 }, { $all: [ 1, 2 ] } ] }
      , Q = filtr(query);
    Q.stack.should.have.length(1);
    Q.stack[0].test.should.be.instanceof(Array);
    Q.test([0,1,2], { type: 'single' }).should.be.true;
  });

  // TODO: More complicated nesting
  // TODO: All nesting options.

});