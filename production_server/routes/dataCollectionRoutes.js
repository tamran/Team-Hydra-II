'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongo_connector = require('../db/mongo_connector');

var _socket_io_connector = require('../socket_io_connector');

var getCurrentTime = function getCurrentTime() {
    var date = new Date().toString();
    return date;
};

var saveMeasurement = function saveMeasurement(req, measurementType) {
    var measurement = req.body;
    (0, _mongo_connector.saveMeasurementDispatcher)(measurementType)(req.params.trialName, measurement);
    measurement.name = req.params.trialName;
    measurement.time = getCurrentTime();
    (0, _socket_io_connector.emitter)(measurement, measurementType);
};

var dataCollection = function dataCollection(app) {
    app.route('/api/trials').get(function (req, res) {
        (0, _mongo_connector.getAllTrials)(req.query.filter, res);
    });
    app.route('/api/trial/:trialName').get(function (req, res) {
        (0, _mongo_connector.getTrial)(req.params.trialName, res);
    }).post(function (req, res) {
        (0, _mongo_connector.createTrial)(req.params.trialName);
        res.end();
    });
    app.route('/api/measurement/color/:trialName').post(function (req, res) {
        saveMeasurement(req, 'color');
        res.end();
    });
    app.route('/api/measurement/turbidity/:trialName').post(function (req, res) {
        saveMeasurement(req, 'turbidity');
        res.end();
    });
    app.route('/api/measurement/electrochemical/:trialName').post(function (req, res) {
        saveMeasurement(req, 'electrochemical');
        res.end();
    });
};

exports.default = dataCollection;