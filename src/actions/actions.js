import ActionTypes from './actionTypes';

export const changeNewExperimentText = (textFieldId, changedText) => ({
    type: ActionTypes.CHANGE_NEW_EXPERIMENT_TEXT,
    id: textFieldId,
    text: changedText,
})

export const requestCreateExperiment = () => ({
    type: ActionTypes.CREATE_EXPERIMENT_REQUEST,
})

export const succeedCreateExperiment = () => ({
    type: ActionTypes.CREATE_EXPERIMENT_SUCCESS,
})