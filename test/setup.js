var chai = require('chai')
  , Promise = require('bluebird')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , sandbox = require('sandboxed-module');

require('sinon-as-promised')(Promise);

function noOp() {
	// No op
}

global.should = chai.should();
global.sandbox = sandbox;
global.sinon = sinon;
global.noOp = noOp;

chai.use(sinonChai);
