import { requestCreateExperiment, succeedCreateExperiment, createNewTrial, createNewMeasurement } from './actions';
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
        return fetch('/api/newExperiment', {
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

export const loadAllTrialData = () => {
    return (dispatch) => {
        return fetch('/api/trials')
        .then(res => res.json())
        .then(json => json.forEach(trialName => {
                dispatch(createNewTrial(trialName))
                fetch(`/api/trial/${trialName}`)
                    .then(res => res.json())
                    .then(json => json.forEach(measurement => {
                        dispatch(createNewMeasurement(trialName, measurement));
                    }))
            })
        )
        .then(Promise.resolve())
    }
}
