'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.route = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongo_connector = require('./db/mongo_connector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = exports.route = function route(app) {
    app.route('/').get(function (req, res) {
        if (process.env.NODE_ENV === 'production') {
            res.sendFile(_path2.default.resolve(__dirname, '..', 'build', 'index.html'));
        } else {
            res.sendFile(_path2.default.resolve(__dirname, '..', 'public-dev', 'index.dev.html'));
        }
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