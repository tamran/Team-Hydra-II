'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveMeasurementDispatcher = undefined;

var _models = require('../models');

var saveMeasurementDispatcher = exports.saveMeasurementDispatcher = function saveMeasurementDispatcher(measurementType) {
    switch (measurementType) {
        case 'color':
            return saveColorMeasurement;
        case 'turbidity':
            return saveTurbidityMeasurement;
        case 'electrochemical':
            return saveElectrochemicalMeasurement;
        default:
            console.log(measurementType + ' is not a valid measurement type');
            return;
    }
};

var saveElectrochemicalMeasurement = function saveElectrochemicalMeasurement(trialName, measurement) {
    var newMeasurement = new _models.ElectrochemicalMeasurement({
        StainlessSteel: measurement.StainlessSteel,
        Aluminum: measurement.Aluminum,
        Titanium: measurement.Titanium
    });

    saveMeasurement(trialName, newMeasurement, 'electrochemicalMeasurements');
};

var saveColorMeasurement = function saveColorMeasurement(trialName, measurement) {
    saveRGBMeasurement(trialName, measurement, 'colorMeasurements');
};

var saveTurbidityMeasurement = function saveTurbidityMeasurement(trialName, measurement) {
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