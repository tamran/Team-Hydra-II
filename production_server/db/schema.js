'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.trialDataSchema = exports.electrochemicalMeasurementSchema = exports.colorMeasurementSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var colorMeasurementSchema = exports.colorMeasurementSchema = Schema({
    R: Number,
    G: Number,
    B: Number,
    C: Number,
    ColorTemp: Number,
    lux: Number,
    time: { type: Date, default: Date.now }
});

var electrochemicalMeasurementSchema = exports.electrochemicalMeasurementSchema = Schema({
    StainlessSteel: Number,
    Aluminum: Number,
    Titanium: Number,
    time: { type: Date, default: Date.now }
});

var trialDataSchema = exports.trialDataSchema = Schema({
    name: String,
    time: { type: Date, default: Date.now },
    colorMeasurements: [{ type: Schema.Types.ObjectId, ref: 'ColorMeasurement' }],
    turbidityMeasurements: [{ type: Schema.Types.ObjectId, ref: 'ColorMeasurement' }],
    electrochemicalMeasurements: [{ type: Schema.Types.ObjectId, ref: 'ElectrochemicalMeasurement' }]
});