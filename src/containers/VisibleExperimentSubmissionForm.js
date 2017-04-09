import { connect } from 'react-redux';
import { changeNewExperimentText } from '../actions/actions';
import { createExperiment } from '../actions/asyncActions';
import ExperimentSubmissionForm from '../components/ExperimentSubmissionForm';

const mapStateToProps = (state, props) => ({
    dataFields: state.newExperimentInfo,
    buttonText: props.buttonText,
});

const mapDispatchToProps = (dispatch) => ({
    onChangeText: (textFieldId, changedText) => dispatch(changeNewExperimentText(textFieldId, changedText)),
    onSubmit: () => dispatch(createExperiment()),
});

const VisibleExperimentSubmissionForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExperimentSubmissionForm);

export default VisibleExperimentSubmissionForm;
