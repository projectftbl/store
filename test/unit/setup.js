var chai = require('chai')
  , Promise = require('bluebird')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , proxyquire = require('proxyquire');

require('sinon-as-promised')(Promise);

function noOp() { /* No op */ }

global.should = chai.should();
global.proxyquire = proxyquire;
global.sinon = sinon;
global.noOp = noOp;

chai.use(sinonChai);
