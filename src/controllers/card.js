const handleCrud = require('./handleCRUD');
const Card = require('./../models/card');

exports.allCards = handleCrud.getAll(Card);
exports.oneCard = handleCrud.getOne(Card);
exports.createCard = handleCrud.createOne(Card);
exports.updateCard = handleCrud.updateOne(Card);
exports.removeCard = handleCrud.deleteOne(Card);
