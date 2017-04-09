import { Folder, TrialData } from '../models'
import { getAllItems, getItem, createItem } from './items'

export const getAllFolders = (filter, res) => {
    return getAllItems(Folder, filter, res);
}

export const getFolder = (folderName, res) => {
    return getItem(Folder, folderName, 'trials', res);
}

export const createFolder = (folderName) => {
    return createItem(Folder, folderName)
}

export const addTrialToFolder = (trialName, folderName, res) => {
    TrialData.findOne({ name: trialName })
        .exec((err, trial) => {
            if (!trial) {
                console.log(`${trialName} is not a valid trial name`)
                res.end()
                return
            }

            Folder.findOne({name: folderName})
                .exec((err, folder) => {
                    if (!folder) {
                        console.log(`${folderName} is not a valid folder name`)
                        res.end()
                        return
                    }
                    folder.trials.push(trial._id)
                    folder.markModified('trials')
                    folder.save()
                    res.end()
                })
        })
}
