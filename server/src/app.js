import express from "express"
import cors from "cors"

const app = express()


app.use(cors({
    origin: "*", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  }))

app.use(express.json({
    limit : "20kb"
}))

app.use(express.urlencoded({
    extended : true,
    limit : '20kb'
}))

app.use(express.static("public"))


// routes import

import  aiRouter  from "./routes/ai.routes.js";
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/user", userRouter);

export  {app}