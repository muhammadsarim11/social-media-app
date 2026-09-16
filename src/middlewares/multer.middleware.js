import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";


const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"pixel-feed"
    },
    format: ['png','jpg','jpeg','svg']
})


  const upload = multer({storage})

  export default upload