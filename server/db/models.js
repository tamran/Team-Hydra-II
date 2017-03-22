import mongoose from 'mongoose';
import { colorMeasurementSchema, electrochemicalMeasurementSchema, trialDataSchema } from './schema.js';

export const ColorMeasurement = mongoose.model('ColorMeasurement', colorMeasurementSchema);
export const ElectrochemicalMeasurement = mongoose.model('ElectrochemicalMeasurement', electrochemicalMeasurementSchema);
export const TrialData = mongoose.model('TrialData', trialDataSchema);
