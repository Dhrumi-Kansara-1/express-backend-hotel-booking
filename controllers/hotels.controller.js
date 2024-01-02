import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

async function createHotel(req, res, next) {
  try {
    const newHotel = new Hotel(req.body)
    const savedHotel = await newHotel.save()
    res.status(200).json({ msg: "Hotel Added Successfully", data: savedHotel })
  } catch (err) {
    next(err)
  }
}

async function updateHotel(req, res, next) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: "Hotel Updated Successfully", data: updatedHotel })
  } catch (err) {
    next(err)
  }
}

async function deleteHotel(req, res, next) {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
     res.status(200).json({ msg: "Hotel deleted Successfully", data: [] })
  } catch (err) {
    next(err)
  }
}

async function fetchHotel(req, res, next) {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json({ msg: "Hotel fetched Successfully", data: hotel })
  } catch (err) {
    next(err)
  }
}

async function fetchAllHotel(req, res, next) {
  try {
    const { min, max, limit, ...others } = req.query
    const hotel = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 99999 },
    }).limit(req.query.limit)
    res.status(200).json({ msg: "All Hotel fetched Successfully", data: hotel })
  } catch (err) {
    next(err)
  }
}
async function fetchHotelRooms(req, res, next) {
  try {
    const hotel = await Hotel.findById(req.params.id)
     const rooms = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res
      .status(200)
      .json({ msg: "Hotel Rooms fetched Successfully", data: rooms })
  } catch (err) {
    next(err)
  }
}

async function countByCity(req, res, next) {
  const cities = req.query.cities.split(",")
  try {
    const hotel = await Hotel.find()
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city })
      })
    )
    res.status(200).json({ msg: "All Hotel fetched Successfully", data: list })
  } catch (err) {
    next(err)
  }
}
async function countByType(req, res, next) {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" })
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
    const resortCount = await Hotel.countDocuments({ type: "resort" })
    const villaCount = await Hotel.countDocuments({ type: "villa" })
    const cabinCount = await Hotel.countDocuments({ type: "cabin" })

    res.status(200).json({
      msg: "All Hotel fetched Successfully",
      data: [
        {
          type: "hotel",
          count: hotelCount,
        },
        {
          type: "apartments",
          count: apartmentCount,
        },
        {
          type: "resorts",
          count: resortCount,
        },
        {
          type: "villas",
          count: villaCount,
        },
        {
          type: "cabins",
          count: cabinCount,
        },
      ],
    })
  } catch (err) {
    next(err)
  }
}

export {
  createHotel,
  updateHotel,
  deleteHotel,
  fetchHotel,
  fetchAllHotel,
  countByCity,
  countByType,
  fetchHotelRooms,
}
