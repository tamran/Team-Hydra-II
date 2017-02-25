'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongo_connector = require('../db/mongo_connector');

var dataCollection = function dataCollection(app) {
    app.route('/trials').get(function (req, res) {
        (0, _mongo_connector.getAllTrials)(res);
    });
    app.route('/trial/:trialName').get(function (req, res) {
        (0, _mongo_connector.getTrial)(req.params.trialName, res);
    }).post(function (req, res) {
        (0, _mongo_connector.createTrial)(req.params.trialName);
        res.end();
    });
    app.route('/measurement/:trialName').post(function (req, res) {
        (0, _mongo_connector.saveMeasurement)(req.params.trialName, req.body);
        res.end();
    });
};

exports.default = dataCollection;