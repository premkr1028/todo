import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const conn = async ()=>{
try {
    mongoose.connect(process.env.DB).then(()=>{
        console.log("db connected")
    })
} catch (error) {
    console.log(err)
}
}

export default conn