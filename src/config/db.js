import mongoose from "mongoose"

export const ConnectDb = async ()=>{

try {
      await mongoose.connect("mongodb://localhost:27017/pixel-feed")
 console.log('connected');
} catch (error) {
    console.log(error);
}

}