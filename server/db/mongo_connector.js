import mongoose from 'mongoose';
import { ColorMeasurement, ElectrochemicalMeasurement, TrialData } from './models.js';

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

export const getAllTrials = (filter, res) => {
    TrialData.find({ name: new RegExp(filter, 'i') })
        .exec((err, trials)=> {
            res.send(trials.map(trial => trial.name))
        })
}

export const getTrial = (trialName, res) => {
    TrialData.findOne({
        name: trialName,
    })
        .populate('colorMeasurements turbidityMeasurements electrochemicalMeasurements')
        .exec((err, trial) => {
            if (!trial) {
                console.log(`${trialName} is not a valid trial name`)
                res.end();
                return;
            }
            res.send(trial.colorMeasurements);
        })
}

export const createTrial = (trialName) => {
    let newTrial = new TrialData({
        name: trialName,
    });
    newTrial.save();
}

export const saveElectrochemicalMeasurement = (trialName, measurement) => {
    let newMeasurement = new ElectrochemicalMeasurement({
        StainlessSteel: measurement.StainlessSteel,
        Aluminum: measurement.Aluminum,
        Titanium: measurement.Titanium,
    })

    saveMeasurement(trialName, newMeasurement, 'electrochemicalMeasurements');
}

export const saveColorMeasurement = (trialName, measurement) => {
    saveRGBMeasurement(trialName, measurement, 'colorMeasurements');
}

export const saveTurbidityMeasurement = (trialName, measurement) => {
    saveRGBMeasurement(trialName, measurement, 'turbidityMeasurements');
}

const saveRGBMeasurement = (trialName, measurement, trialFieldToModify) => {
    let newMeasurement = new ColorMeasurement({
        R: measurement.R,
        G: measurement.G,
        B: measurement.B,
        C: measurement.C,
        ColorTemp: measurement.ColorTemp,
        lux: measurement.lux,
    })

    saveMeasurement(trialName, newMeasurement, trialFieldToModify);
}

const saveMeasurement = (trialName, measurementDBObject, trialFieldToModify) => {
    TrialData.findOne({ name: trialName })
        .exec((err,trial) => {
            if (!trial) {
                console.log(`${trialName} is not a valid trial name`)
                return;
            }
            measurementDBObject.save();
            trial[trialFieldToModify].push(measurementDBObject._id);
            trial.markModified(trialFieldToModify);
            trial.save();
        })
}
