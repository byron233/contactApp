const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contactSchema = new Schema({
    name:String,
    lastname:String,
    phone:Number,
    address:String,
    email:String,
    description:String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('contact', contactSchema);