import { getAllTrials, getTrial, createTrial, saveColorMeasurement, saveTurbidityMeasurement, saveElectrochemicalMeasurement  } from '../db/mongo_connector';
import { emitter } from '../socket_io_connector';

let getCurrentTime = () => {
    let date = new Date().toString(); 
    return date;
}

let dataCollection = (app) => {
    app.route('/api/trials')
        .get((req,res) => {
            getAllTrials(req.query.filter, res);
        })
    app.route('/api/trial/:trialName')
        .get((req,res) => {
            getTrial(req.params.trialName, res)
        })
        .post((req,res) => {
            createTrial(req.params.trialName)
            res.end();
        })
    app.route('/api/measurement/color/:trialName')
        .post((req,res) => {
            let measurement = req.body;
            saveColorMeasurement(req.params.trialName,measurement)
            measurement.name = req.params.trialName;
            measurement.time = getCurrentTime();
            emitter(measurement);
            res.end();
        })
    app.route('/api/measurement/turbidity/:trialName')
        .post((req,res) => {
            let measurement = req.body;
            saveTurbidityMeasurement(req.params.trialName,measurement)
            //measurement.name = req.params.trialName;
            //measurement.time = getCurrentTime();
            //emitter(measurement);
            res.end();
        })
    app.route('/api/measurement/electrochemical/:trialName')
        .post((req,res) => {
            let measurement = req.body;
            saveElectrochemicalMeasurement(req.params.trialName,measurement)
            //measurement.name = req.params.trialName;
            //measurement.time = getCurrentTime();
            //emitter(measurement);
            res.end();
        })
}

export default dataCollection;
