// Import mongoose

const mongoose = require('mongoose')

// Collection tructure

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    password2 : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    profile : {
        type : String,
        required : true
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses",
        required : true
    }],
}, { timestamps : true})

// Model

module.exports = mongoose.model('User', userSchema)