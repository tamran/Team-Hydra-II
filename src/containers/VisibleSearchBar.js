import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { filterTrials, filterFolders } from '../actions/asyncActions';

const mapStateToProps = (state, props) => {
    if (props.searchFor === 'trialData') {
        return {
            label: props.label,
            text: state.allExperimentInfo.filter,
        }
    } else if (props.searchFor === 'folders') {
        return {
            label: props.label,
            text: state.folderInfo.filter,
        }
    }
}

const mapDispatchToProps = (dispatch, props) => {
    if (props.searchFor === 'trialData') {
        return {
            onChangeFilter: (newFilter) => dispatch(filterTrials(newFilter)),
        }
    } else if (props.searchFor === 'folders') {
        return {
            onChangeFilter: (newFilter) => dispatch(filterFolders(newFilter)),
        }
    }
}

const VisibleSearchBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);

export default VisibleSearchBar
