import path from 'path';
import { getAllTrials, getTrial, createTrial, saveMeasurement } from './db/mongo_connector';

export const route = (app) => {
    app.route('/')
        .get((req,res) => {
            if (process.env.NODE_ENV === 'production') {
                res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
            } else {
                res.sendFile(path.resolve(__dirname, '..', 'public-dev', 'index.dev.html'));
            }
        })
        .post((req,res) => {
            console.log(req.body);
            res.end();
        })
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
            res.end();
        })
}
