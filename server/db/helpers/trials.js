import { TrialData } from '../models'
import { getAllItems, getItem, createItem } from './items'

export const getAllTrials = (filter, res) => {
    return getAllItems(TrialData, filter, res);
}

export const getTrial = (trialName, res) => {
    return getItem(TrialData, trialName, 'colorMeasurements turbidityMeasurements electrochemicalMeasurements', res);
}

export const createTrial = (trialName) => {
    return createItem(TrialData, trialName)
}

