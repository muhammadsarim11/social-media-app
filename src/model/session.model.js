
import mongoose from "mongoose";



const sessionSchema = mongoose.Schema({

refreshToken:{
    type:String,
    required:[true,"refresh token is required"]
},

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},

userAgent:{
    type:String
},

userDevice:{
    type:String
},

revoke:{
    type:Boolean,
    default:false
}

},{
    timestamps:true
})


export const Session = mongoose.model("Session",sessionSchema)

