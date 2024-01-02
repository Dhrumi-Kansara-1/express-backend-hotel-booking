import express from "express"
import {
  updateUser,
  deleteUser,
  fetchAllUser,
  fetchUser,
} from "../controllers/users.controller.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/verify",verifyToken,(req, res)=>{
//     res.json("working")
// })
// router.get("/verifyuser/:id",verifyUser,(req, res)=>{
//     res.json("hello user you are logged in and you can delete your account")
// })
// router.get("/verifyadmin/:id",verifyAdmin,(req, res)=>{
//     res.json("hello admin you are logged in and you can delete all account")
// })
router.get("/", verifyAdmin, fetchAllUser)
router.put("/:id", verifyUser, updateUser)
router.delete("/:id", verifyUser, deleteUser)
router.get("/:id", verifyUser, fetchUser)

export default router
