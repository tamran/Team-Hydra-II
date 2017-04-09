'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTrial = exports.getTrial = exports.getAllTrials = undefined;

var _models = require('../models');

var _items = require('./items');

var getAllTrials = exports.getAllTrials = function getAllTrials(filter, res) {
    return (0, _items.getAllItems)(_models.TrialData, filter, res);
};

var getTrial = exports.getTrial = function getTrial(trialName, res) {
    return (0, _items.getItem)(_models.TrialData, trialName, 'colorMeasurements turbidityMeasurements electrochemicalMeasurements', res);
};

var createTrial = exports.createTrial = function createTrial(trialName) {
    return (0, _items.createItem)(_models.TrialData, trialName);
};