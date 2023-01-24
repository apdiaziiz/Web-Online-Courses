// Import express
const express = require('express')
const Course = require('../collectionSchema/coursesSchema')
const fs = require('fs')
const path = require('path')
const User = require('../collectionSchema/userSchema')
// import get,post,put,delete into user
const { 
    getCourses,
    createCourse,
    UpdateCourse,
    } = require('../colllection/courseControl')


const router = express.Router()

router.get('/courses', getCourses)
router.post('/courses', createCourse)
router.put('/courses/:id', UpdateCourse)

// Export module

module.exports = router