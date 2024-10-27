import mongoose from "mongoose";

let taskSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
user:{
    type:Object
}
})
let taskDet = mongoose.model("Task", taskSchema)
export default taskDet