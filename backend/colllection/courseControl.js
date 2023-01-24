// Import user schema
const Courses = require('../collectionSchema/coursesSchema')
const User = require('../collectionSchema/userSchema')
const mongoose = require('mongoose')

// Get all courses

const getCourses = async (req,res) => {
    const info = await Courses.find()
    res.status(200).json({info})    
}

// Create a new courses

const createCourse = async (req,res) => {
    const { user, courseTitle, coverImage, teacher, desc, sell } = req.body
    // const existUser = await User.findById(user)
    try{const newcourse = await Courses.create({ 
        user,
        courseTitle,
        coverImage,
        teacher,
        desc,
        sell
    })
    res.stats(200).json({newcourse})
    }catch(error){
    console.log({message: error})
    res.status(401).jsone({message: 'unable to post a course'})
}


}
// // Update user

const UpdateCourse = async (req,res) => {
    const {id} = req.params
    try {
        // find user id
        const courseId = await Courses.findById(id)
        
        if(!courseId) {
           
            res.status(400).json({message : 'courseId not found'})

        } else {
            const upddateUser = await Courses.findByIdAndUpdate(
                req.params.id,
                req.body
            ) 
            res.status(200).json({ upddateUser})
        }
    } catch(error) {
        console.log({message : error})
    }
}

// // Delete user

const deleteCourse = async (req,res) => {
    const {_id} = req.params.id
    try {
        // User id in database
        const deleteCourse = await Courses.findByIdAndRemove(_id).populate('User')
        console.log(deleteCourse)
        await deleteCourse.user.courses.pull(deleteCourse)
        await deleteCourse.user.save()
        res.status(200).json({ message : `Course deleted by id: ${id}` })
        if (!deleteCourse) {
            res.status(401).json({message : "courseId not found"})
        } else {
            await deleteCourse.remove()
            res.status(200).json({ message : `Course deleted by id: ${req.params.id}` })
        }
       
    } catch(error) {
        console.log({message : error})
    }
}


module.exports = {
    getCourses,
    createCourse,
    UpdateCourse,
    deleteCourse
}