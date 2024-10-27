import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    taskList: {
        type: Array
    }
})
let user_schema = mongoose.model("User", userSchema)
export default user_schema