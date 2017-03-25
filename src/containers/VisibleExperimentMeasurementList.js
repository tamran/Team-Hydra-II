import { connect } from 'react-redux';
import ExperimentMeasurementList from '../components/ExperimentMeasurementList';

const mapStateToProps = (state) => ({
    name: state.currentExperiment.name,
    colorMeasurements: state.currentExperiment.measurements.color,
    turbidityMeasurements: state.currentExperiment.measurements.turbidity,
    electrochemicalMeasurements: state.currentExperiment.measurements.electrochemical,
})

const VisibleExperimentMeasurementList = connect(
    mapStateToProps
)(ExperimentMeasurementList);

export default VisibleExperimentMeasurementList;
