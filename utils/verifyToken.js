import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

function verifyToken(req, res, next) {
  const token = req.cookies.access_token

  /* token not present */
  if (!token) {
    return next(
      createError({ status: 401, message: "You are not authenticated!" })
    )
  }

  /* verify token */
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError({ status: 403, message: "Token is not valid!" }))
    }
    /* pass payload */
    req.user = user
    next()
  })
}

function verifyUser(req, res, next) {
  verifyToken(req, res, next, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next()
    } else {
      return next(
        createError({ status: 403, message: "you are not authorized!" })
      )
    }
  })
}
function verifyAdmin(req, res, next) {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      return next(
        createError({ status: 403, message: "you are not authorized!" })
      )
    }
  })
}

export { verifyToken, verifyUser, verifyAdmin }
