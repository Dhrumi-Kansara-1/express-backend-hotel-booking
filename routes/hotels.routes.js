import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import {
  createHotel,
  updateHotel,
  deleteHotel,
  fetchHotel, 
  fetchAllHotel,
  countByCity,
  countByType,
  fetchHotelRooms,
} from "../controllers/hotels.controller.js"
import { fetchAllRoom } from "../controllers/rooms.controller.js"

const router = express.Router()

/* filter and count */
router.get("/countbycity", countByCity)
router.get("/countbytype", countByType)

/* create */
router.post("/", verifyAdmin, createHotel)

/* update */
router.put("/:id", verifyAdmin, updateHotel)

/* delete */
router.delete("/:id", verifyAdmin, deleteHotel)

/* fetch */
router.get("/find/:id", fetchHotel)

/* fetch all */
router.get("/", fetchAllHotel)

/* fetch all rooms of a hotel*/
router.get("/rooms/:id", fetchHotelRooms)

export default router


