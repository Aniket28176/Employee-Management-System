const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmploySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
    updatedAt:{
        type:Date,
        default:new Date(),
    },
    
});

const EmployModel = mongoose.model('employees',EmploySchema);
module.exports = EmployModel;