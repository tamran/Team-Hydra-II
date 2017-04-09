'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addTrialToFolder = exports.createFolder = exports.getFolder = exports.getAllFolders = undefined;

var _models = require('../models');

var _items = require('./items');

var getAllFolders = exports.getAllFolders = function getAllFolders(filter, res) {
    return (0, _items.getAllItems)(_models.Folder, filter, res);
};

var getFolder = exports.getFolder = function getFolder(folderName, res) {
    return (0, _items.getItem)(_models.Folder, folderName, 'trials', res);
};

var createFolder = exports.createFolder = function createFolder(folderName) {
    return (0, _items.createItem)(_models.Folder, folderName);
};

var addTrialToFolder = exports.addTrialToFolder = function addTrialToFolder(trialName, folderName, res) {
    _models.TrialData.findOne({ name: trialName }).exec(function (err, trial) {
        if (!trial) {
            console.log(trialName + ' is not a valid trial name');
            res.end();
            return;
        }

        _models.Folder.findOne({ name: folderName }).exec(function (err, folder) {
            if (!folder) {
                console.log(folderName + ' is not a valid folder name');
                res.end();
                return;
            }
            folder.trials.push(trial._id);
            folder.markModified('trials');
            folder.save();
            res.end();
        });
    });
};