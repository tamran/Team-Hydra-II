import { connect } from 'react-redux';
import StatusBox from '../components/StatusBox';

const mapStateToProps = (state) => ({
    text: state.currentExperiment.message,
    time: state.currentExperiment.lastReadingTime,
})

const VisibleStatusBox = connect(
    mapStateToProps
)(StatusBox);

export default VisibleStatusBox;
