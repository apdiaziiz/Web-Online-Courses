const jwt = require('jsonwebtoken')
const User = require('../collectionSchema/userSchema')

const protect = async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

            req.user = await User.findById(decoded.id).select('-password')
            res.json({msg : 'user protected'})
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}

module.exports = { protect }