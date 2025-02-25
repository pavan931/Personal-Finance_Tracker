const mongoose = require('mongoose');
const Category = require('./Category');

const transactionSchema = new mongoose.Schema(
    {
        user :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        type : {
            type:String,
            required:true,
            enum:["income","expense"]
        },
        Category : {
            type:String,
            required:true,
            default:"Uncategorized"
        },
        amount :{
            type:Number,
            required:true,
        },
        date:{
            type:Date,
            default:Date.now
        },
        description:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Transaction",transactionSchema);