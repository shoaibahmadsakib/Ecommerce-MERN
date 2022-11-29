import jwt from 'jsonwebtoken'

import asyncHandler from 'express-async-handler'
import User from '../models/usersModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
    {
        console.log('token found');
    }
    try {
        token =req.headers.authorization?.split(" ")[1]
        const decoded = jwt.verify(token ,process.env.GENERATE_TOKEN)
        console.log(decoded);

        req.user =await User.findById(decoded.id).select('-password')
    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error("not authorize ,token not found")
    }
    if (!token) {
        res.status(401)
        throw new Error('not authorize ,no token')
    }
    next()
})

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()

    }
    else{
        res.status(401)
        throw new Error('not authorize as an admin')
    }
}

export  {protect ,admin}