import mongoose from "mongoose";
const userSchema = mongoose.Schema({

username:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
      required:true,
    unique:true
},
password:{
    type:String,
    required:true
},

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
role:{
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  
  profileImage:{
    type:String
  },

  coverImage:{
    type:String
  },
  bio:{
    type:String
  },

  gender:{
    type:String
  },

  isPublic:{
    type:Boolean,
    default:true
  },

socialLinks:[
  { 
     instagram:{
        type:String

    },
    facebook:{
        type:String

    }
}
]
},{timestamps:true})


export const User = mongoose.model("User",userSchema)