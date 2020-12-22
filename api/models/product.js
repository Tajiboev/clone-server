const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    // createdBy: {type: Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, required: true},
    price: {type: Number, required: true}
})

module.exports = mongoose.model('Product', productSchema)