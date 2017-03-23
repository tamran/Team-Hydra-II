'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveTurbidityMeasurement = exports.saveColorMeasurement = exports.saveElectrochemicalMeasurement = exports.createTrial = exports.getTrial = exports.getAllTrials = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('./models.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;
_mongoose2.default.connect(process.env.MONGODB_URI);

var getAllTrials = exports.getAllTrials = function getAllTrials(filter, res) {
    _models.TrialData.find({ name: new RegExp(filter, 'i') }).exec(function (err, trials) {
        res.send(trials.map(function (trial) {
            return trial.name;
        }));
    });
};

var getTrial = exports.getTrial = function getTrial(trialName, res) {
    _models.TrialData.findOne({
        name: trialName
    }).populate('colorMeasurements turbidityMeasurements electrochemicalMeasurements').exec(function (err, trial) {
        if (!trial) {
            console.log(trialName + ' is not a valid trial name');
            res.end();
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

var saveElectrochemicalMeasurement = exports.saveElectrochemicalMeasurement = function saveElectrochemicalMeasurement(trialName, measurement) {
    var newMeasurement = new _models.ElectrochemicalMeasurement({
        StainlessSteel: measurement.StainlessSteel,
        Aluminum: measurement.Aluminum,
        Titanium: measurement.Titanium
    });

    saveMeasurement(trialName, newMeasurement, 'electrochemicalMeasurements');
};

var saveColorMeasurement = exports.saveColorMeasurement = function saveColorMeasurement(trialName, measurement) {
    saveRGBMeasurement(trialName, measurement, 'colorMeasurements');
};

var saveTurbidityMeasurement = exports.saveTurbidityMeasurement = function saveTurbidityMeasurement(trialName, measurement) {
    saveRGBMeasurement(trialName, measurement, 'turbidityMeasurements');
};

var saveRGBMeasurement = function saveRGBMeasurement(trialName, measurement, trialFieldToModify) {
    var newMeasurement = new _models.ColorMeasurement({
        R: measurement.R,
        G: measurement.G,
        B: measurement.B,
        C: measurement.C,
        ColorTemp: measurement.ColorTemp,
        lux: measurement.lux
    });

    saveMeasurement(trialName, newMeasurement, trialFieldToModify);
};

var saveMeasurement = function saveMeasurement(trialName, measurementDBObject, trialFieldToModify) {
    _models.TrialData.findOne({ name: trialName }).exec(function (err, trial) {
        if (!trial) {
            console.log(trialName + ' is not a valid trial name');
            return;
        }
        measurementDBObject.save();
        trial[trialFieldToModify].push(measurementDBObject._id);
        trial.markModified(trialFieldToModify);
        trial.save();
    });
};