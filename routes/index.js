import express from "express"
import authRoute from "./auth.routes.js"
import usersRoute from "./users.routes.js"
import roomsRoute from "./rooms.routes.js"
import hotelsRoute from "./hotels.routes.js"

const router=express.Router()

router.use("/auth",authRoute)
router.use("/users",usersRoute)
router.use("/rooms",roomsRoute)
router.use("/hotels",hotelsRoute)
  
export default router