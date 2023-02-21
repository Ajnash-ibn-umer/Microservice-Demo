import mongoose from "mongoose";
import {Schema} from 'mongoose';

const UserSchema =new Schema({
    name:String,
    email:String,
    password:String,
    createdAt:{type:String,default:Date.now()}
})

export default mongoose.model('user',UserSchema)
