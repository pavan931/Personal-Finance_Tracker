const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const User = require('../model/User');
const jwt = require('jsonwebtoken')

// ! User Registration

const usersController = {
    //! Register
    register : asyncHandler(async(req,res) =>{
        // res.json({message: "Register"})
        const {username , email,password} = req.body

        // !Validate
        if(!username || !email || !password){
            throw new Error("Please all fields are required")
        }

        // ! check if user already exists
        const userExists = await User.findOne({email})
        if(userExists){
            throw new Error("user already Exists")
        }
        // ! Hash the password
        const salts  = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salts)

        // ! Create the user and save into db
        const userCreated = await User.create({
            username,
            email,
            password:hashedPassword
        })
        // !Send the response

        res.json({
            username: userCreated.username,
            email : userCreated.email,
            id : userCreated._id
        })
    }),

    //! Login

    login : asyncHandler(async(req,res)=>{
        // !Get the user data
        const{email,password} = req.body
        // ! check if email is valid

        const user = await User.findOne({email})
        if(!user){
            throw new Error("Invalid login credentials")
        }

        // !ompare user paswword
        const isMatch = await bcrypt.compare(password,user.password) //This ios going to return a boolean value
        if(!isMatch){
            throw new Error("Invalid login credentials")

        }

        // !Generate a token for the user
        const token = jwt.sign({id:user._id}, "pavandas",
            {expiresIn:"30d"}
        )
        // !Send the response
        res.json({
            message: 'Login Success',
            token,
            id:user._id,
            username: user.username,
            email:user.email
        })
    }),
    //! Profile

    profile: asyncHandler(async(req,res)=>{
        const user = await User.findById("67a34039c9721fce986955c5")

        if(!user){
            throw new Error("User not found")
        }
        //! Send the response
        res.json({username:user.username, email : user.email})
    })
}

module.exports = usersController;