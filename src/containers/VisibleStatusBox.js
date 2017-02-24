import { connect } from 'react-redux';
import StatusBox from '../components/StatusBox';

const mapStateToProps = (state) => ({
    text: state.statusBox.message,
    time: state.statusBox.lastReadingTime,
})

const VisibleStatusBox = connect(
    mapStateToProps
)(StatusBox);

export default VisibleStatusBox;
