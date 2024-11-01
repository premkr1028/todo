import { Router } from "express";
import user_schema from "../modules/user.js";
import taskDet from "../modules/tasks.js";

let taskRoute = Router()

taskRoute.post("/addTask", async (req, res) => {
    const { tittle, body, email } = req.body;
    let existingUser = await user_schema.findOne({ email })
    if (!existingUser) {
        return res.status(400).json({ "msg": "user not found" })
    }
    let task = new taskDet({ tittle, body, user: existingUser._id })
    await task.save().then(() => res.status(200).json({ task }))
    existingUser.taskList.push(task)

    
})
taskRoute.put("/updateTask/:id", async (req, res) => {
    const { tittle, body } = req.body;
    let updatingTask = await taskDet.findByIdAndUpdate(req.params.id, { tittle, body })
    updatingTask.save().then(() => res.status(200).json({ updatingTask }))
})
taskRoute.delete("/deleteTask:id", async (req, res) => {
    const { email } = req.body;
    await user_schema.findByIdAndUpdate(email, { $pull: { taskList: req.params.id } })
    let deleteTask = await taskDet.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ "msg": "delete" }))

})


taskRoute.get("/getTasks", async (req, res) => {
    const { email } = req.body;

    let user = await user_schema.findOne({ email })
    let alltasks = await taskDet.find({ user: user._id })
    res.status(200).json({ alltasks })

})
export default taskRoute