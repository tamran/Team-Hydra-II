'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.route = undefined;

var _mongo_connector = require('./db/mongo_connector');

var route = exports.route = function route(app) {
    app.route('/').get(function (req, res) {
        res.send('Welcome to Team Hydra II!\nNavigate to /trials to list all trial names.\n  Navigate to trial/:trialName to get the data associated with the :trialName experiment');
    }).post(function (req, res) {
        console.log(req.body);
        res.end();
    });
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