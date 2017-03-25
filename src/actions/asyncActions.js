import { requestCreateExperiment, succeedCreateExperiment, createNewTrial, createNewMeasurement, changeFilter, clearTrials } from './actions';
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
    return (dispatch, getState) => {
        return fetch(`/api/trials?filter=${getState().allExperimentInfo.filter}`)
        .then(res => res.json())
        .then(json => json.forEach(trialName => {
            dispatch(createNewTrial(trialName))
            fetch(`/api/trial/${trialName}`)
                .then(res => res.json())
                .then(json => {
                    json.colorMeasurements.forEach(measurement => {
                        dispatch(createNewMeasurement(trialName, measurement,'color'));
                    })
                    json.turbidityMeasurements.forEach(measurement => {
                        dispatch(createNewMeasurement(trialName, measurement,'turbidity'));
                    })
                    json.electrochemicalMeasurements.forEach(measurement => {
                        dispatch(createNewMeasurement(trialName, measurement,'electrochemical'));
                    })
                })
            })
        )
        .then(Promise.resolve())
    }
}

export const filterTrials = (newFilter) => {
    return (dispatch) => {
        dispatch(changeFilter(newFilter));
        dispatch(clearTrials());
        dispatch(loadAllTrialData());
        return Promise.resolve();
    }
}
