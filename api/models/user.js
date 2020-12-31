const mongoose = require('mongoose')
const { Schema } = mongoose;

const educationSchema = new Schema({ 
    country: {type: String, required: true},
    university: {type: String, required: true},
    degree: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true}
})

const privateSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true 
    },
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    emailStatus: {type: String, enum: ["in-use", "pending", "verified"]}
})

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, unique: true, trim: true, minLength: [5, "Username must be at least 5 characters long"]},
    private: privateSchema,
    name: {type: String},
    bio: {type: String},
    accountType: {type: String, enum: ["freelancer", "employer"]},
    location: {type: String},
    skills: [String],
    education: [educationSchema],
    experience: [String],
    createdAt: {type: Date, default: Date.now},
}, {strictQuery: true})


module.exports = mongoose.model('User', userSchema)