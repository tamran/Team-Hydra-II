import { connect } from 'react-redux';
import ExperimentMeasurementList from '../components/ExperimentMeasurementList';

const mapStateToProps = (state) => ({
    measurements: state.currentExperiment.measurements,
})

const VisibleExperimentMeasurementList = connect(
    mapStateToProps
)(ExperimentMeasurementList);

export default VisibleExperimentMeasurementList;
