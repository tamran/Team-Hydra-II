'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var experimentData = {};

var setCurrentExperiment = function setCurrentExperiment(body) {
    var turbidity = body['Turbidity'].text;
    var conc = body['Concentration'].text;
    var numExperiments = body['Number of Measurements'].text;
    var initialWait = body['initialWait'].text;
    var totalExperimentTime = body['totalExperimentTime'].text;
    var currentTime = new Date().toISOString();
    var experimentName = 'turbidity_' + turbidity + '_concentration_' + conc + '_numExperiments_' + numExperiments + '_time_' + currentTime;

    experimentData = {
        turbidity: turbidity,
        concentration: conc,
        numExperiments: numExperiments,
        initialWait: initialWait,
        totalExperimentTime: totalExperimentTime,
        time: currentTime,
        experimentName: experimentName
    };

    console.log(experimentData);
};
var getExperimentData = function getExperimentData() {
    return experimentData;
};
var clearExperimentData = function clearExperimentData() {
    var newExperiment = experimentData;
    experimentData = {};
    return newExperiment;
};

var experimentCreation = function experimentCreation(app) {
    app.route('/api/newExperiment').get(function (req, res) {
        res.send(getExperimentData());
    }).post(function (req, res) {
        setCurrentExperiment(req.body);
        res.end();
    });
    app.route('/api/clearExperiment').get(function (req, res) {
        res.send(clearExperimentData());
    });
};

exports.default = experimentCreation;