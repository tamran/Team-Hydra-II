'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveMeasurementDispatcher = exports.createItem = exports.getTrial = exports.getAllTrials = exports.addTrialToFolder = exports.createFolder = exports.getFolder = exports.getAllFolders = undefined;

var _folders = require('./helpers/folders');

Object.defineProperty(exports, 'getAllFolders', {
  enumerable: true,
  get: function get() {
    return _folders.getAllFolders;
  }
});
Object.defineProperty(exports, 'getFolder', {
  enumerable: true,
  get: function get() {
    return _folders.getFolder;
  }
});
Object.defineProperty(exports, 'createFolder', {
  enumerable: true,
  get: function get() {
    return _folders.createFolder;
  }
});
Object.defineProperty(exports, 'addTrialToFolder', {
  enumerable: true,
  get: function get() {
    return _folders.addTrialToFolder;
  }
});

var _trials = require('./helpers/trials');

Object.defineProperty(exports, 'getAllTrials', {
  enumerable: true,
  get: function get() {
    return _trials.getAllTrials;
  }
});
Object.defineProperty(exports, 'getTrial', {
  enumerable: true,
  get: function get() {
    return _trials.getTrial;
  }
});
Object.defineProperty(exports, 'createItem', {
  enumerable: true,
  get: function get() {
    return _trials.createItem;
  }
});

var _measurements = require('./helpers/measurements');

Object.defineProperty(exports, 'saveMeasurementDispatcher', {
  enumerable: true,
  get: function get() {
    return _measurements.saveMeasurementDispatcher;
  }
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;
_mongoose2.default.connect(process.env.MONGODB_URI);