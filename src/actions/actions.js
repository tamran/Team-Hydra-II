import ActionTypes from './actionTypes';

export const clearFolders = () => ({
    type: ActionTypes.CLEAR_FOLDERS,
})

export const changeFolderFilter = (newFilter) => ({
    type: ActionTypes.CHANGE_FOLDER_FILTER,
    filter: newFilter,
})

export const createNewFolder = (folderName) => ({
    type: ActionTypes.CREATE_NEW_FOLDER,
    name: folderName,
})

export const addTrialToFolder = (folderName, trialName) => ({
    type: ActionTypes.ADD_TRIAL_TO_FOLDER,
    folderName: folderName,
    trialName: trialName,
})

export const changeLocation = (location) => ({
    type: ActionTypes.LOCATION_CHANGE,
    location: location,
})

export const changeNewExperimentText = (textFieldId, changedText) => ({
    type: ActionTypes.CHANGE_NEW_EXPERIMENT_TEXT,
    id: textFieldId,
    text: changedText,
})

export const updateLastMeasurement = (measurement, measType) => ({
    type: ActionTypes.UPDATE_LATEST_MEASUREMENT,
    measurementType: measType,
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

export const createNewMeasurement = (trialName, measurement, measType) => ({
    type: ActionTypes.CREATE_NEW_MEASUREMENT,
    name: trialName,
    measurement: measurement,
    measurementType: measType,
})

export const changeTrialFilter = (newFilter) => ({
    type: ActionTypes.CHANGE_TRIAL_FILTER,
    filter: newFilter
})
export const clearTrials = () => ({
    type: ActionTypes.CLEAR_TRIALS,
})
