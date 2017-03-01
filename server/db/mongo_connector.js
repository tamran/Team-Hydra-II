import mongoose from 'mongoose';
import { ColorMeasurement, TrialData } from './models.js';

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

export const getAllTrials = (res) => {
    TrialData.find({})
    .populate('colorMeasurements')
        .exec((err, trials)=> {
            res.send(trials.map(trial => trial.name))
        })
}

export const getTrial = (trialName, res) => {
    TrialData.findOne({
        name: trialName,
    })
        .populate('colorMeasurements')
        .exec((err, trial) => {
            if (!trial) {
                console.log(`${trialName} is not a valid trial name`)
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

export const saveMeasurement = (trialName, measurement) => {
    TrialData.findOne({ name: trialName })
        .exec((err,trial) => {
            if (!trial) {
                console.log(`${trialName} is not a valid trial name`)
                return;
            }
            let newMeasurement = new ColorMeasurement({
                R: measurement.R,
                G: measurement.G,
                B: measurement.B,
                C: measurement.C,
                ColorTemp: measurement.ColorTemp,
                lux: measurement.lux,
            })
            newMeasurement.save();

            trial.colorMeasurements.push(newMeasurement._id);
            trial.markModified('colorMeasurements');
            trial.save();
        })
}

