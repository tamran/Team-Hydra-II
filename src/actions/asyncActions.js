import { requestCreateExperiment, succeedCreateExperiment } from './actions';
import fetch from 'isomorphic-fetch';

const experimentInfoIsValid = (experimentInfoMap) => {

    for (var key in experimentInfoMap) {
        if (experimentInfoMap[key].text === '') {
            return false;
        }
    }
    return true;
}

export const createExperiment = () => {
    return (dispatch, getState) => {
        if (!experimentInfoIsValid(getState().newExperimentInfo.byId)) {
            return;
        }

        dispatch(requestCreateExperiment());
        return fetch('/', {
                headers: {
                    'Accept':'text/plain',
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({
                    ...getState().newExperimentInfo.byId
                })
        })
            .then(dispatch(succeedCreateExperiment()))
            .then(Promise.resolve())
    }
}
