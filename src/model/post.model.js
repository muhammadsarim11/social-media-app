import mongoose, { mongo } from 'mongoose'


const postSchema = mongoose.Schema({


userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},

caption:{
    type:String,
    required:true
},

image:{
    type:String,
    required:true
},

likes:{
    type:Number
},

comment:{
    type:Number
}


},{timestaps:true})



export const Post = mongoose.model("Post",postSchema)