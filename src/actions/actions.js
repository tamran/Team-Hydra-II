import ActionTypes from './actionTypes';

export const changeNewExperimentText = (textFieldId, changedText) => ({
    type: ActionTypes.CHANGE_NEW_EXPERIMENT_TEXT,
    id: textFieldId,
    text: changedText,
})
