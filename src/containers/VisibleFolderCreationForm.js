import { connect } from 'react-redux';
import { changeNewFolderText } from '../actions/actions';
import { createFolder } from '../actions/asyncActions';
import ExperimentSubmissionForm from '../components/ExperimentSubmissionForm';

const mapStateToProps = (state, props) => ({
    dataFields: state.newFolderInfo,
    buttonText: props.buttonText
});

const mapDispatchToProps = (dispatch) => ({
    onChangeText: (textFieldId, changedText) => dispatch(changeNewFolderText(textFieldId, changedText)),
    onSubmit: () => dispatch(createFolder()),
});

const VisibleFolderCreationForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExperimentSubmissionForm);

export default VisibleFolderCreationForm;
