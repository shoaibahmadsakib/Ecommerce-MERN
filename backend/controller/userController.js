import asyncHandler from "express-async-handler";
import Products from '../models/productsModel.js'
import User from "../models/usersModel.js";
import generateToken from "../utils/generateToken.js";


// @des auth and get token
// @route get /api/users/login
// @addess Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            
        })

    }
    else {
        res.status(401)
        throw new Error("invalid email and password")
    }
})


// @des register new user
// @route post /api/users/login
// @addess Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('user already exist')
    }
    const user = await User.create({
        name, email, password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @des auth and get token
// @route get /api/users/profile
// @addess private
const userProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error("invalid email and password")
    }

})



// @des auth and get token
// @route put /api/users/profile
// @addess private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password){
        user.password =req.body.password
      }

      const updateUser = await user.save()
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id)
    })
    }
    else {
        res.status(401)
        throw new Error("user not found")
    }

})



// @des auth and get token
// @route get /api/users/admin
// @private admin
const getUsers = asyncHandler(async (req, res) => {
   
    const users = await User.find({})
    res.json(users)

   
   
})
// @des auth and get token
// @route get /api/users/:id
// @route private admin

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
// @des auth and get token
// @route delete /api/users/admin
// @private admin
const deleteUser = asyncHandler(async (req, res) => {
   
    const users = await User.findById(req.params.id)
    if(users){
        await users.remove()
        res.json({ message:"user remove"})

    }
    else{
     res.status(401)
     throw new Error("user not found")
    }
    res.json(users)

   
   
})


// @des update user
// @route put /api/users/:id
// @addess private
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin
     

      const updateUser = await user.save()
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
       
    })
    }
    else {
        res.status(401)
        throw new Error("user not found")
    }

})



export { authUser, userProfile, registerUser ,updateUserProfile , getUsers ,deleteUser , updateUser, getUserById}