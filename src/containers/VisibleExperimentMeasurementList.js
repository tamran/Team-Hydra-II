import { connect } from 'react-redux';
import ExperimentMeasurementList from '../components/ExperimentMeasurementList';

const mapStateToProps = (state) => ({
    name: state.currentExperiment.name,
    measurements: state.currentExperiment.measurements,
})

const VisibleExperimentMeasurementList = connect(
    mapStateToProps
)(ExperimentMeasurementList);

export default VisibleExperimentMeasurementList;