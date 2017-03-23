import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const colorMeasurementSchema = Schema({
    R: Number,
    G: Number,
    B: Number,
    C: Number,
    ColorTemp: Number,
    lux: Number,
    time: { type: Date, default: Date.now },
});

export const electrochemicalMeasurementSchema = Schema({
    StainlessSteel: Number,
    Aluminum: Number,
    Titanium: Number, 
})

export const trialDataSchema = Schema({
    name: String,
    time: { type: Date, default: Date.now },
    colorMeasurements: [{type: Schema.Types.ObjectId, ref: 'ColorMeasurement'}],
    turbidityMeasurements: [{type: Schema.Types.ObjectId, ref: 'ColorMeasurement'}],
    electrochemicalMeasurements: [{type: Schema.Types.ObjectId, ref: 'ElectrochemicalMeasurement'}],
})
