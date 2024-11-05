import express from "express"
import dotenv from "dotenv"
import conn from "./dbConnection.js";
import taskDet from "./modules/tasks.js";
import mongoose from "mongoose";
import user_schema from "./modules/user.js";
import router from "./routes/auth.js";
import taskRoute from "./routes/tasksRoute.js";
import cors from "cors"
dotenv.config();
let app = express()
let port = process.env.PORT
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//routes
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/signIn", (req, res) => {
    res.render("signIn")
})
app.get("/addtask", (req, res) => {
    res.render("addTask")
})
app.get("/updatetask", (req, res) => {
    res.render("update")
})
app.get("/gettask", (req, res) => {
    res.render("alltasks")
})
app.use("/api/v1", router)
app.use("/api/v2", taskRoute)

conn()
async function delData() {
    let tasks = await taskDet.deleteMany({})
    let det = await  user_schema.deleteMany({})
    console.log(tasks)
    console.log(det)
}
// delData()

app.listen(port, () => {
    console.log("your server is running on", process.env.PORT)
})