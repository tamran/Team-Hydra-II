import { getTrial, createTrial, saveMeasurement } from './db/mongo_connector';

export const route = (app) => {
    app.route('/')
        .get((req,res) => {
            res.send('hello world')
        })
        .post((req,res) => {
            console.log(req.body);
            res.end();
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
