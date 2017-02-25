let experimentData = {};

let setCurrentExperiment = (body) => {
    const turbidity = body['Turbidity'].text;
    const conc = body['Concentration'].text;
    const numExperiments = body['Number of Measurements'].text;
    const currentTime = new Date().toISOString()
    const experimentName = turbidity + conc + numExperiments + currentTime;

    experimentData = {
        turbidity: turbidity,
        concentration: conc,
        numExperiments: numExperiments,
        time: currentTime,
        experimentName: experimentName,
    }

    console.log(experimentData);
} 
const getExperimentData = () => {
    return experimentData;
}
let clearExperimentData = () => {
    const newExperiment = experimentData;
    experimentData = {};
    return newExperiment;
}

let experimentCreation = (app) => {
    app.route('/newExperiment')
        .get((req,res) => {
            res.send(getExperimentData());
        })
        .post((req,res) => {
            console.log(req.body);
            setCurrentExperiment(req.body)
            res.end();
        })
    app.route('/clearExperiment')
        .get((req,res)=> {
            res.send(clearExperimentData());
        })
}

export default experimentCreation;
