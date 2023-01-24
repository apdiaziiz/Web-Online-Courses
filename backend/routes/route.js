const express = require('express')
const {
    register,
    login,
    displayUser,
    //deleteUser,
 } = require('../colllection/userControl')
 


 const router = express.Router();

 router.post('/users/register',register)
//  router.post('/user/:id',deleteUser)
 router.post('/users/login',login)
 router.get('/users/display',displayUser)

 module.exports = router