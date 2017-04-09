import { routerReducer } from 'react-router-redux';
import folderInfo from './folderInfo';
import allExperimentInfo from './allExperimentInfo';
import currentExperiment from './currentExperiment';
import newExperimentInfo from './newExperimentInfo';

const root = (state=
{
    folderInfo: undefined,
    allExperimentInfo: undefined,
    newExperimentInfo: undefined,
    currentExperiment: undefined,
    routing: undefined,
}
, action) => {
    return {
        ...state,
        folderInfo: folderInfo(state.folderInfo, action),
        allExperimentInfo: allExperimentInfo(state.allExperimentInfo, action),
        newExperimentInfo: newExperimentInfo(state.newExperimentInfo, action),
        currentExperiment: currentExperiment(state.currentExperiment, action),
        routing: routerReducer(state.routing, action),
    }
}

export default root;
