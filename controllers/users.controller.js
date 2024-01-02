import User from "../models/User.js"

async function updateUser(req, res, next) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: "User Updated Successfully", data: updatedUser })
  } catch (error) {
    next(err)
  }
}

async function deleteUser(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: "User deleted Successfully", data: [] })
  } catch (error) {
    next(err)
  }
}

async function fetchUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({ msg: "User fetched Successfully", data: user })
  } catch (err) {
    next(err)
  }
}

async function fetchAllUser(req, res, next) {
  let failed = false
  if (failed) {
    return next(
      createError({ status: 400, message: "you are not authenticated" })
    )
  }
  try {
    const user = await User.find()
    res.status(200).json({ msg: "All Users fetched Successfully", data: user })
  } catch (err) {
    next(err)
  }
}

export {
  updateUser,
  deleteUser,
  fetchUser,
  fetchAllUser,
}
