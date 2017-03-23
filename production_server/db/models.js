'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrialData = exports.ElectrochemicalMeasurement = exports.ColorMeasurement = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = require('./schema.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorMeasurement = exports.ColorMeasurement = _mongoose2.default.model('ColorMeasurement', _schema.colorMeasurementSchema);
var ElectrochemicalMeasurement = exports.ElectrochemicalMeasurement = _mongoose2.default.model('ElectrochemicalMeasurement', _schema.electrochemicalMeasurementSchema);
var TrialData = exports.TrialData = _mongoose2.default.model('TrialData', _schema.trialDataSchema);