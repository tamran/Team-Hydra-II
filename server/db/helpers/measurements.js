import { ColorMeasurement, ElectrochemicalMeasurement, TrialData } from '../models'

export const saveMeasurementDispatcher = (measurementType) => {
    switch(measurementType) {
        case 'color':
            return saveColorMeasurement
        case 'turbidity':
            return saveTurbidityMeasurement
        case 'electrochemical':
            return saveElectrochemicalMeasurement
        default:
            console.log(`${measurementType} is not a valid measurement type`)
            return
    }
}

const saveElectrochemicalMeasurement = (trialName, measurement) => {
    let newMeasurement = new ElectrochemicalMeasurement({
        StainlessSteel: measurement.StainlessSteel,
        Aluminum: measurement.Aluminum,
        Titanium: measurement.Titanium,
    })

    saveMeasurement(trialName, newMeasurement, 'electrochemicalMeasurements');
}

const saveColorMeasurement = (trialName, measurement) => {
    saveRGBMeasurement(trialName, measurement, 'colorMeasurements');
}

const saveTurbidityMeasurement = (trialName, measurement) => {
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

