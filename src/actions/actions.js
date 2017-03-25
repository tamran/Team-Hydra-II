import ActionTypes from './actionTypes';

export const changeLocation = (location) => ({
    type: ActionTypes.LOCATION_CHANGE,
    location: location,
})

export const changeNewExperimentText = (textFieldId, changedText) => ({
    type: ActionTypes.CHANGE_NEW_EXPERIMENT_TEXT,
    id: textFieldId,
    text: changedText,
})

export const updateLastMeasurement = (measurement) => ({
    type: ActionTypes.UPDATE_LATEST_MEASUREMENT,
    measurement: measurement,
})

export const requestCreateExperiment = () => ({
    type: ActionTypes.CREATE_EXPERIMENT_REQUEST,
})

export const succeedCreateExperiment = () => ({
    type: ActionTypes.CREATE_EXPERIMENT_SUCCESS,
})

export const createNewTrial = (trialName) => ({
    type: ActionTypes.CREATE_NEW_TRIAL,
    name: trialName,
})

export const createNewMeasurement = (trialName, measurement) => ({
    type: ActionTypes.CREATE_NEW_MEASUREMENT,
    name: trialName,
    measurement: measurement,
})

export const changeFilter = (newFilter) => ({
    type: ActionTypes.CHANGE_FILTER,
    filter: newFilter
})
export const clearTrials = () => ({
    type: ActionTypes.CLEAR_TRIALS,
})
