import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"

async function createRoom(req, res, next) {
  try {
    const newRoom = new Room(req.body)
    const savedRoom = await newRoom.save()

    /* add room in hotel */
    await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      {
        $push: {
          rooms: savedRoom._id
        },
      },
      { new: true }
    )

    res.status(200).json({ msg:"Room Added Successfully",data: savedRoom })
    
  } catch (err) {
   next(err)
  }
} 

async function updateRoomAvailability(req, res, next) {
  try {
    const updatedRoom = await Room.updateOne(
      {
        "roomNumbers._id":req.params.roomNumberId
      },
      {
        $push: {
          "roomNumbers.$.unavailableDates":req.body.dates
        },
      },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: "Room unavailable dates updated Successfully", data: updatedRoom })
  } catch (err) {
    next(err)
  }
}

async function updateRoom(req, res, next) {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: "Room Updated Successfully", data: updatedRoom })
  } catch (err) {
    next(err)
  }
}

async function deleteRoom(req, res, next) {
  try {
     /* delete room in hotel */
     await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      {
        $pull: {
          rooms: req.params.id
        },
      },
      { new: true }
    )

    await Room.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: "Room deleted Successfully", data: [] })
  } catch (err) {
    next(err)
  }
}

async function fetchRoom(req, res, next) {
  try {
    const room = await Room.findById(req.params.id)
    res.status(200).json({ msg: "Room fetched Successfully", data: user })
  } catch (err) {
    next(err)
  }
}

async function fetchAllRoom(req, res, next) {
  let failed = false
  if (failed) {
    return next(
      createError({ status: 400, message: "you are not authenticated" })
    )
  }
  try {
    const room = await Room.find()
    res.status(200).json({ msg: "All Rooms fetched Successfully", data: room })
  } catch (err) {
    next(err)
  }
}

export {
  createRoom,
  updateRoom,
  deleteRoom,
  fetchRoom,
  fetchAllRoom,
  updateRoomAvailability
}
