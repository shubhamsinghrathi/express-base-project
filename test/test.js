
var assert = require('assert');
const { should } = require('chai');
should();


/**
 * 
 * NOTE -->  THE CODE BELOW IS JUST AN EXAMPLE, WRITE YOUR OWN TEST CASES
 * 
 */


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


var index = require('./index');

describe('simpleObj', () => {
  describe('a', () => {
    it('should be equal to 1', () => {
      // assert.equal(index.simpleObj.a, 1); /////the assert way
      index.simpleObj.a.should.equal(1) //////the should way
    });
  });

  describe('b', () => {
    it('should be equal to 2', () => {
      // assert.equal(index.simpleObj.b, 2);
      index.simpleObj.b.should.equal(2);
    });
  });
});

describe('Validators', () => {
  describe("stringValidator", () => {
    it("should return false when provided a blank string", () => {
      // assert.equal(index.stringValidator("   "), false);
      index.stringValidator("   ").should.equal(false);
    });
    it("should return true when provided a fine string", () => {
      // assert.equal(index.stringValidator("hello"), true);
      index.stringValidator("hello").should.equal(true);
    });
  });
});

describe('asyncFxn', () => {
  it('should return no error', async () => {
    var res = await index.asyncFxn(true);
    res.should.have.length(3);
  });
});