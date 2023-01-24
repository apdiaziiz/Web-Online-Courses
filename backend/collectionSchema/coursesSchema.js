const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    courseTitle : {
        type : String,
        required : true,
    },
    coverImage : {
        type : String,
        required : true,
    },
    teacher : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true,
    },
    sell : {
        type : String,
        required : true,
    },
    postedTime : {
        type : Date,
        default : Date.now,
    }
}, { timestamps : true})

module.exports = mongoose.model('Courses', courseSchema)
