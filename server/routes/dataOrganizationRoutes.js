import { getAllFolders, getFolder, createFolder, addTrialToFolder } from '../db/mongo_connector'

let dataOrganization = (app) => {
    app.route('/api/folders')
        .get((req,res) => {
            getAllFolders(req.query.filter, res);
        })
    app.route('/api/folder/:folderName')
        .get((req,res) => {
            getFolder(req.params.folderName, res)
        })
        .post((req,res) => {
            createFolder(req.params.folderName)
            res.end();
        })
    app.route('/api/folder/:folderName/:trialName')
        .post((req, res) => {
            addTrialToFolder(req.params.trialName,req.params.folderName,res)
        })
}

export default dataOrganization;
