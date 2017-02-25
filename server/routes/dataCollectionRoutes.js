import { getAllTrials, getTrial, createTrial, saveMeasurement } from '../db/mongo_connector';
import { emitter } from '../socket_io_connector';


let dataCollection = (app) => {
    app.route('/trials')
        .get((req,res) => {
            getAllTrials(res);
        })
    app.route('/trial/:trialName')
        .get((req,res) => {
            getTrial(req.params.trialName, res)
        })
        .post((req,res) => {
            createTrial(req.params.trialName)
            res.end();
        })
    app.route('/measurement/:trialName')
        .post((req,res) => {
            saveMeasurement(req.params.trialName,req.body)
            emitter(new Date().toISOString());
            res.end();
        })
}

export default dataCollection;
