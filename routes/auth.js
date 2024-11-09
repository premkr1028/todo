import express from "express";
import user_schema from "../modules/user.js";
import bcrypt from "bcrypt"
let router = express.Router()
let saltRounds = 10
router.post("/register", async (req, res) => {
    let { userName, email, password } = req.body;
    bcrypt.hash(password, saltRounds,async function (err, hash) {
        let userData = await user_schema.create({
            userName,
            email,
            password :hash
    
        })
        if (!userData) {
            return res.status(400).send({ message: "failed" })
        }
        res.status(200).json({message:"signUp Success"})
    }); 
})
router.post("/signin", async (req, res) => {
const { email, password } = req.body;
let userData = await user_schema.findOne({email})
if(!userData){
    return res.json({"err" : "id not found"})
}

bcrypt.compare(password, userData.password, function(err, result) {
    if(!result){
        return res.status(400).json({"message":"Invalid Password"})
          }
          res.status(200).json({"Log in":"success"})
        });
})

export default router
