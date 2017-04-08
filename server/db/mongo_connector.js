import mongoose from 'mongoose';

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

export { getAllFolders, getFolder, createFolder, addTrialToFolder } from './helpers/folders'
export { getAllTrials, getTrial, createItem } from './helpers/trials'
export { saveMeasurementDispatcher } from './helpers/measurements'
