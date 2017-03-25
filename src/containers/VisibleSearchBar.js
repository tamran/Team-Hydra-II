import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { filterTrials } from '../actions/asyncActions';

const mapStateToProps = (state, props) => ({
    label: props.label,
    text: state.allExperimentInfo.filter,
})

const mapDispatchToProps = (dispatch) => ({
    onChangeFilter: (newFilter) => dispatch(filterTrials(newFilter)),
})

const VisibleSearchBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);

export default VisibleSearchBar
