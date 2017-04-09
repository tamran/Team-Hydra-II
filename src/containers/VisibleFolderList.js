import { connect } from 'react-redux';
import FolderList from '../components/FolderList';

const mapStateToProps = (state) => ({
    folderInfo: state.folderInfo.folders,
})

const VisibleFolderList = connect(
    mapStateToProps
)(FolderList);

export default VisibleFolderList;
