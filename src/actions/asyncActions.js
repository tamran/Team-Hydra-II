import { requestUpdateFolder, succeedUpdateFolder, requestCreateFolder, succeedCreateFolder, clearFolders, changeFolderFilter, createNewFolder, addTrialToFolder, requestCreateExperiment, succeedCreateExperiment, createNewTrial, createNewMeasurement, changeTrialFilter, clearTrials } from './actions';
import fetch from 'isomorphic-fetch';

const infoIsValid = (infoMap) => {

    for (var key in infoMap) {
        if ( infoMap[key].text === '') {
            return false;
        }
    }
    return true;
}

export const updateFolder = () => {
    return (dispatch, getState) => {
        if (!infoIsValid(getState().updateFolderInfo.byId)) {
            return;
        }

        dispatch(requestUpdateFolder());
        return fetch(`/api/folder/${getState().updateFolderInfo.byId['Folder Name'].text}/${getState().updateFolderInfo.byId['Trial Name'].text}`, {
                headers: {
                    'Accept':'text/plain',
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({
                })
        })
            .then(dispatch(succeedUpdateFolder()))
            .then(Promise.resolve())
    }
}
export const createFolder = () => {
    return (dispatch, getState) => {
        if (!infoIsValid(getState().newFolderInfo.byId)) {
            return;
        }

        dispatch(requestCreateFolder());
        return fetch(`/api/folder/${getState().newFolderInfo.byId['New Folder Name'].text}`, {
                headers: {
                    'Accept':'text/plain',
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({
                })
        })
            .then(dispatch(succeedCreateFolder()))
            .then(Promise.resolve())
    }
}

export const createExperiment = () => {
    return (dispatch, getState) => {
        if (!infoIsValid(getState().newExperimentInfo.byId)) {
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

export const loadAllFolders = () => {
    return (dispatch, getState) => {
        return fetch(`/api/folders?filter=${getState().folderInfo.filter}`)
            .then(res => res.json())
            .then(json => json.forEach( folderName => {
                dispatch(createNewFolder(folderName))
                fetch(`api/folder/${folderName}`)
                    .then(res => res.json())
                    .then(json => {
                        json.trials.forEach(trial => {
                            dispatch(addTrialToFolder(folderName, trial.name))
                        })
                    })
                    .then(Promise.resolve())
            } ))
            .then(Promise.resolve())
    }
}

export const filterTrials = (newFilter) => {
    return (dispatch) => {
        dispatch(changeTrialFilter(newFilter));
        dispatch(clearTrials());
        dispatch(loadAllTrialData());
        return Promise.resolve();
    }
}

export const filterFolders = (newFilter) => {
    return (dispatch) => {
        dispatch(changeFolderFilter(newFilter));
        dispatch(clearFolders());
        dispatch(loadAllFolders());
        return Promise.resolve();
    }
}
