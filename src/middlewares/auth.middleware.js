import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js'


export const AuthProtect = async (req, res, next) => {

    const { refreshToken } = req.cookies

    if (!refreshToken) {
        return res.status(404).json({
            message: "no token found"
        })
    }


    let decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
   
    console.log(decoded)
    const user = await User.findById({ _id:decoded.id})

    if (!user) {
        return res.status(404).json({
            message: "no user found!"
        })
    }
    req.user = user

    next()
}





export const restrictTo =  (...role) => {

    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                message: "access forbidden"
            })
        }

        next()
    }

}




