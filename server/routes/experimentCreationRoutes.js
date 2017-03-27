let experimentData = {};

let setCurrentExperiment = (body) => {
    const turbidity = body['Turbidity'].text;
    const conc = body['Concentration'].text;
    const numExperiments = body['Number of Measurements'].text;
    const currentTime = new Date().toISOString()
    const experimentName = `turbidity_${turbidity}_concentration_${conc}_numExperiments_${numExperiments}_time_${currentTime}`;

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
    app.route('/api/newExperiment')
        .get((req,res) => {
            res.send(getExperimentData());
        })
        .post((req,res) => {
            setCurrentExperiment(req.body)
            res.end();
        })
    app.route('/api/clearExperiment')
        .get((req,res)=> {
            res.send(clearExperimentData());
        })
}

export default experimentCreation;
