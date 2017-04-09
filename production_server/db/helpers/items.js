'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getAllItems = exports.getAllItems = function getAllItems(Model, filter, res) {
    Model.find({ name: new RegExp(filter, 'i') }).exec(function (err, items) {
        res.send(items.map(function (item) {
            return item.name;
        }));
    });
};

var getItem = exports.getItem = function getItem(Model, itemName, fieldsToPopulate, res) {
    Model.findOne({
        name: itemName
    }).populate(fieldsToPopulate).exec(function (err, item) {
        if (!item) {
            console.log(item + ' was not found in the database');
            res.end();
            return;
        }
        res.send(item);
    });
};

var createItem = exports.createItem = function createItem(Model, itemName) {
    var newItem = new Model({
        name: itemName
    });
    newItem.save();
};