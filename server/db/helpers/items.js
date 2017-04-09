export const getAllItems = (Model, filter, res) => {
    Model.find({ name: new RegExp(filter, 'i') })
        .exec((err, items) => {
            res.send(items.map(item => item.name))
        })
}

export const getItem = (Model, itemName, fieldsToPopulate, res) => {
    Model.findOne({
        name: itemName,
    })
    .populate(fieldsToPopulate)
        .exec((err, item) => {
            if (!item) {
                console.log(`${item} was not found in the database`)
                res.end();
                return;
            }
            res.send(item);
        })
}

export const createItem = (Model, itemName) => {
    let newItem = new Model({
        name: itemName,
    });
    newItem.save();
}
