import { connect } from 'react-redux';
import TrialDataList from '../components/TrialDataList';

const mapStateToProps = (state) => ({
    allExperimentInfo: state.allExperimentInfo,
})

const VisibleTrialDataList = connect(
    mapStateToProps
)(TrialDataList);

export default VisibleTrialDataList;
