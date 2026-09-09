import bcrypt from 'bcrypt'
import { User } from '../model/user.model.js'
import jwt from 'jsonwebtoken'
import { Session } from '../model/session.model.js'
import crypto from 'crypto'
import { sendEmail } from '../../utils/sendEmail.js'
import {resetPasswordTemplate} from '../../utils/emailTemplates.js'




export const RegisterUser = async (req, res) => {

    const { username, email, password , role } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "fill all fields"
        })
    }
    const HashedPassword = await bcrypt.hash(password, 10)
    const users = await User.create({
        username,
        email,
        password: HashedPassword,
        role
    })

    let payload = {
        id: users._id,
        email: users.email
    }
    const options = {
        expiresIn: '4h'
    };


    const secret =  process.env.JWT_SECRET


    const refreshToken = jwt.sign(payload, secret, options)


    let session = await Session.create({
        refreshToken:refreshToken,
        userId:users._id,
        userAgent:req.headers["user-agent"],
        userDevice:req.ip,
        revoke:false

     })



    const accessToken = jwt.sign(payload,secret,options)



    res.cookie('refreshToken', refreshToken).status(200).json({
        message: "createdddd",
        users,
        accessToken
    })

}

export const LoginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "fill all fields"
        })
    }
    const user = await User.findOne({
        email
    })
    if (!user) {
        return res.status(404).json({
            message: "no user found"
        })
    }
    console.log(password, user.password);
    let IspassMatched = await bcrypt.compare(password, user.password)

    if (!IspassMatched) {
        return res.status(400).json({
            message: "invalid credentials"
        })
    }

    let payload = {
        id: user._id,
        email: user.email
    }
    const options = {
        expiresIn: '4h'
    };


    const secret = process.env.JWT_SECRET

    const refreshToken = jwt.sign(payload, secret, options)



    const accessToken = jwt.sign(payload,secret,options)



    res.cookie('refreshToken', refreshToken).status(200).json({
        message: "successfully login",
        user,
        accessToken

    })

}


 export const GetUserDetails = async (req, res) => {
    const token = req.cookies && req.cookies.token
    if (!token || typeof token !== 'string') {
        return res.status(401).json({
            message: "no token"
        })
    }
    try {
       var decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    if (!decoded) {
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    const UserDetails = await User.findOne({
        _id: decoded.id
    })
    res.status(200).json({
        message: {
            UserDetails
        }
    })
}




export const getAccessToken = async( req,res)=>{

  const refreshToken = req.cookies && req.cookies.refreshToken


  if(!refreshToken){

  return res.status(401).json({
    message:"no token found"
  })
  }


             let decoded = jwt.verify( refreshToken,process.env.JWT_SECRET)

             let accessToken = jwt.sign({
               id:decoded._id,
               email:decoded.email
             },
             process.env.JWT_SECRET,
             {
                expiresIn:"15m"
             }
            
            )

   res.status(200).json({
    message:"token generated!",
    accessToken
   })

}




export const LogOut = async(req,res)=>{

    const refreshToken = req.cookies && req.cookies.refreshToken

    if(!refreshToken){

        return res.status(401).json({
            message:"no token found"
        })
    }


    let session  = await Session.findOne({
        refreshToken,
        revoke:false
    })


    if(!session){
        return res.status(401).json({
            message:"invalid token"
        })
    }

session.revoke = true

  await session.save()


  res.clearCookie("refreshToken")

  res.status(200).json({
    message:"logout successfully"
  })



}



export const forgetPassword = async(req,res)=>{

    const {email} = req.body
    if(!email){
        return res.status(404).json({
            message:"fill all fields"
        })
    }

     
   let user  = await User.findOne({
        email
    })
 

    if(!user){
        return res.status(401).json({
            message:"invalid email"
        })
    }



    let resetToken = crypto.randomBytes(32).toString('hex')
     
    user.resetPasswordToken=resetToken
    user.resetPasswordExpires = Date.now()+15*60*1000 

     await user.save()
  
     const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: resetPasswordTemplate(user.name, resetUrl),
      });



    } catch (mailError) {
            console.error("Password reset email failed:", mailError.message);
      return res.status(500).json({
        success: false,
        message: "Email could not be sent. Please try again later.",
      });
    }

    return res.status(200).json({ success: true, message: "link has been sent" });
     

}



export const changePassword = async(req,res)=>{

    const {password} = req.body
    const {resetToken} = req.params 

    if(!resetToken){
        return res.status(400).json({
            message:"no token found"
        })
    }

   let user = await User.findOne({
        resetPasswordToken:resetToken,
        resetPasswordExpires: { $gt: Date.now() }

    })

    if(!password){
        return res.status(400).json({
            message:"no password found"
        })
    }

       
      let hashedPassword  = await bcrypt.hash(password,12)

      user.password = hashedPassword
    
      await user.save()



       res.status(200).json({
        message:"password changes successfully"
       })

}