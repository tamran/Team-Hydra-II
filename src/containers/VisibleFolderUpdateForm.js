import { connect } from 'react-redux';
import { changeUpdateFolderText } from '../actions/actions';
import { updateFolder } from '../actions/asyncActions';
import ExperimentSubmissionForm from '../components/ExperimentSubmissionForm';

const mapStateToProps = (state, props) => ({
    dataFields: state.updateFolderInfo,
    buttonText: props.buttonText
});

const mapDispatchToProps = (dispatch) => ({
    onChangeText: (textFieldId, changedText) => dispatch(changeUpdateFolderText(textFieldId, changedText)),
    onSubmit: () => dispatch(updateFolder()),
});

const VisibleFolderUpdateForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExperimentSubmissionForm);

export default VisibleFolderUpdateForm;
