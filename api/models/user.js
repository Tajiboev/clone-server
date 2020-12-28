const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true 
    },
    username: {type: String, unique: true, trim: true, minLength: [5, "Username must be at least 5 characters long"]},
    name: {type: String},
    bio: {type: String},
    emailStatus: {type: String, enum: ["in-use", "pending", "verified"]},
    accountType: {type: String, enum: ["freelancer", "employer"]},
    location: {type: String},
    skills: [String],
    education: [String],
    experience: [String],
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('User', userSchema)