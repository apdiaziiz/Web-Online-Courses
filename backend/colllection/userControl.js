const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../collectionSchema/userSchema')

const register = async (req,res) => {
    try {
        const { username, email, password, password2, description, profile } = req.body
    
        if(!username || !email || !password || !password2 || !description || !profile) {
            res.status(400).json({message : 'Please add fields'})
        }
       
        // check if user exist 
    
        const userExist = await User.findOne({email})
    
        if (userExist) {
            res.status(400).json({message : 'User already exist'})
        } else {
    
            // hassed password
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
            const hashedPassword2 = await bcrypt.hash(password2, salt)

            // register new user
            const newUser = await User.create({
                username,
                email,
                password : hashedPassword,
                password2 : hashedPassword2,
                description,
                profile,
                course : []
            })

            if (newUser) {
                res.status(200).json({
                    id : newUser.id,
                    name : newUser.username,
                    email : newUser.email,
                    desc : newUser.desc,
                    token : generateToken(newUser._id)
                })
            }
        }
    } catch (error) {
        res.status(401).json({ message: error})
    }

}

const login = async (req,res) => {
    try {

        const { email, password } = req.body
    
        const user = await User.findOne({email})
    
        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id : user.id,
                name : user.username,
                email : user.email,
                token : generateToken(user._id)
            })
        }
        res.status(401).send({message : 'Invalid user and password'})
    } catch (error) {
        res.status(401).json({ message : error})
    }
}


const displayUser = async (req,res) => {
    const users = await User.find()
    res.status(200).json ({ users })
}

// const deleteUser = async (req,res) => {
//     const { id } = req.params.id
//     const user = await User.findById({id})
//     try {
//         if (!user) {
//             res.status(401).json({message : 'ids is not matching.'})
//         }
//         const userDeleted = await User.findByIdAndDelete(id)
//         res.status(200).json({userDeleted})
//     } catch (err) {
//         console.log({err : err})
//         res.status(404).json({message : "user not deleted"})
//     }
// }

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN,{ expiresIn : '20d'})
}

module.exports = {
    register,
    // deleteUser,
    login,
    displayUser,
}