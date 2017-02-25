
let experimentName = undefined;

let setCurrentExperiment = (body) => {
    let turbidity = body['Turbidity'].text;
    let conc = body['Concentration'].text;
    let numExperiments = body['Number of Measurements'].text;
    experimentName = turbidity + conc + numExperiments;
    console.log(experimentName);
} 
const getExperimentName = () => {
    return experimentName;
}
let clearExperimentName = () => {
    const newExperiment = experimentName;
    experimentName = undefined;
    return newExperiment;
}

let experimentCreation = (app) => {
    app.route('/newExperiment')
        .get((req,res) => {
            res.send(getExperimentName());
        })
        .post((req,res) => {
            console.log(req.body);
            setCurrentExperiment(req.body)
            res.end();
        })
    app.route('/clearExperiment')
        .get((req,res)=> {
            res.send(clearExperimentName());
        })
}

export default experimentCreation;
