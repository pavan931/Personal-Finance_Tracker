const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const User = require('../model/User');
const jwt = require('jsonwebtoken')



const categoryController = {
    //! add
    create : asyncHandler(async(req,res) =>{
        const {name,type} = req.body
        if( !name || !type){
            throw new Error("Name and type are required for creating a category")
        }

        //! COnvert the name to lower case
        const normalizedName = name.toLowerCase()
        // ! Check if the type is valid
        const validTypes = ['income','expense'];
        if(!validTypes.includes(type.toLowerCase())){
            throw new Error("Invalid category type"+ type)
        }

        // ! check if the category already exists on the user
        const categoryExists = await categoryController.findOne({
            name:normalizedName,
            user:req.user
        });
        if(categoryExists){
            throw new Error(
                `Category ${categoryExists.name} already exists in the database`
            );
        }
        // ! Create the Category
        const category = await Category.create({
            name:normalizedName,
            user:req.user,
            type
        });
        res.status(201).json(category);
    }),

    //! lists

    lists : asyncHandler(async(req,res)=>{
       
    }),
    //! update

    update: asyncHandler(async(req,res)=>{ }),

    // ! delete

    delete: asyncHandler(async(req,res)=>{ }),

}

module.exports = categoryController;