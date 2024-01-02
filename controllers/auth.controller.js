import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { createError } from "../utils/error.js"

async function register(req, res, next) {
  try {
    let saltRounds = 10

    /* check if same username and email doesnot exist */

    /* 1. generate salt and create hash */
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      /* 2. create user */
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      })
      /* save user */
      await newUser.save()
    })

    res.status(200).json({
      success: true,
      status: 200,
      message: "User created Successfully!",
    })
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    /* 1. check if user exist */

    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return next(createError({ status: 404, message: "User does not exist" }))
    }

    /* 2. compare password */
    const isPasswordCorret = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorret) {
      return next(
        createError({
          status: 400,
          message: "Username or password is incorrect",
        })
      )
    }

    /* 3. create jwt token */
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    /* 3. send token and user in response */
    const { password, isAdmin, ...otherUserDeails } = user._doc 
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        status: 200,
        message: "User loged in Successfully!",
        data: otherUserDeails,
      })
  } catch (err) {
    next(err)
  }
}

export {
  register,
  login,
}
