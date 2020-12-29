const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: true},
    budget: {type: Number, required: true},
    attachments: {type: Number, required: true},
    createdBy: {type: String, ref: 'User', required: true},
    createdAt: {type: Date, required: true}
})

module.exports = mongoose.model('Project', productSchema)