import { routerReducer } from 'react-router-redux';
import folderInfo from './folderInfo';
import allExperimentInfo from './allExperimentInfo';
import currentExperiment from './currentExperiment';
import newExperimentInfo from './newExperimentInfo';
import newFolderInfo from './newFolderInfo';
import updateFolderInfo from './updateFolderInfo';

const root = (state=
{
    folderInfo: undefined,
    allExperimentInfo: undefined,
    newExperimentInfo: undefined,
    currentExperiment: undefined,
    newFolderInfo: undefined,
    updateFolderInfo: undefined,
    routing: undefined,
}
, action) => {
    return {
        ...state,
        folderInfo: folderInfo(state.folderInfo, action),
        allExperimentInfo: allExperimentInfo(state.allExperimentInfo, action),
        newExperimentInfo: newExperimentInfo(state.newExperimentInfo, action),
        currentExperiment: currentExperiment(state.currentExperiment, action),
        newFolderInfo: newFolderInfo(state.newFolderInfo, action),
        updateFolderInfo: updateFolderInfo(state.updateFolderInfo, action),
        routing: routerReducer(state.routing, action),
    }
}

export default root;
