import mongoose from "mongoose";
import {Schema} from 'mongoose';

const UserSchema =new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    createdAt:{type:String,default:Date.now()}
})

export default mongoose.model('user',UserSchema)
