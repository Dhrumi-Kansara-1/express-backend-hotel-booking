import express from "express"
import {
  fetchAllRoom,
  fetchRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
} from "../controllers/rooms.controller.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/", fetchAllRoom)

router.get("/:id", fetchRoom)
router.post("/:hotelId", verifyAdmin, createRoom)
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:roomNumberId", updateRoomAvailability)
router.delete("/:id/:hotelId/", verifyAdmin, deleteRoom)

export default router
