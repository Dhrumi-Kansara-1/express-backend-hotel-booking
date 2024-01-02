import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db.js" 
import routes from "./routes/index.js"
import cookieParser from "cookie-parser"

const app = express() 
dotenv.config()

/* middleware */ 
var corsOptions = {
  origin: "http://192.168.1.54:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions)) 
app.use(cookieParser()) 
app.use(express.json()) 
app.use("/api", routes) 
/* handling error middleware */
app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message || "something went wrong!",
    stack: err.stack || [],
  }
  res.status(error.status).json({
    success: false,
    status: error.status,
    message: error.message,
    stack: error.stack,
  })
})

let PORT = 8800
app.listen(PORT, () => {
  connectDB()
  console.log(`Connected to backend using PORT ${PORT}`)
})
