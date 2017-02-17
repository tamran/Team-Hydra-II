import mongoose from 'mongoose';
import { colorMeasurementSchema, trialDataSchema } from './schema.js';

export const ColorMeasurement = mongoose.model('ColorMeasurement', colorMeasurementSchema);
export const TrialData = mongoose.model('TrialData', trialDataSchema);
