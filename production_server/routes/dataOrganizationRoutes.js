'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongo_connector = require('../db/mongo_connector');

var dataOrganization = function dataOrganization(app) {
    app.route('/api/folders').get(function (req, res) {
        (0, _mongo_connector.getAllFolders)(req.query.filter, res);
    });
    app.route('/api/folder/:folderName').get(function (req, res) {
        (0, _mongo_connector.getFolder)(req.params.folderName, res);
    }).post(function (req, res) {
        (0, _mongo_connector.createFolder)(req.params.folderName);
        res.end();
    });
    app.route('/api/folder/:folderName/:trialName').post(function (req, res) {
        (0, _mongo_connector.addTrialToFolder)(req.params.trialName, req.params.folderName, res);
    });
};

exports.default = dataOrganization;