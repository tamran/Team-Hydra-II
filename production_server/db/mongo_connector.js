'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveMeasurement = exports.createTrial = exports.getTrial = exports.getAllTrials = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('./models.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;
_mongoose2.default.connect(process.env.MONGODB_URI);

var getAllTrials = exports.getAllTrials = function getAllTrials(res) {
    _models.TrialData.find({}).populate('colorMeasurements').exec(function (err, trials) {
        res.send(trials.map(function (trial) {
            return trial.name;
        }));
    });
};

var getTrial = exports.getTrial = function getTrial(trialName, res) {
    _models.TrialData.findOne({
        name: trialName
    }).populate('colorMeasurements').exec(function (err, trial) {
        if (!trial) {
            console.log(trialName + ' is not a valid trial name');
            return;
        }
        res.send(trial.colorMeasurements);
    });
};

var createTrial = exports.createTrial = function createTrial(trialName) {
    var newTrial = new _models.TrialData({
        name: trialName
    });
    newTrial.save();
};

var saveMeasurement = exports.saveMeasurement = function saveMeasurement(trialName, measurement) {
    _models.TrialData.findOne({ name: trialName }).exec(function (err, trial) {
        if (!trial) {
            console.log(trialName + ' is not a valid trial name');
            return;
        }
        var newMeasurement = new _models.ColorMeasurement({
            R: measurement.R,
            G: measurement.G,
            B: measurement.B,
            C: measurement.C,
            ColorTemp: measurement.ColorTemp,
            lux: measurement.lux
        });
        newMeasurement.save();

        trial.colorMeasurements.push(newMeasurement._id);
        trial.markModified('colorMeasurements');
        trial.save();
    });
};