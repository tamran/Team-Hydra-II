import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const colorMeasurementSchema = Schema({
    R: Number,
    G: Number,
    B: Number,
    ColorTemp: Number,
    lux: Number,
    time: { type: Date, default: Date.now },
});

export const trialDataSchema = Schema({
    name: String,
    colorMeasurements: [{type: Schema.Types.ObjectId, ref: 'ColorMeasurement'}],
})

