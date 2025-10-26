import { Router } from "express";
import { getItinaryResult } from "../controllers/itinary.controller.js";
import multer from "multer";

const router = new Router()
const upload = multer()

router.route("/generate-response").post(upload.none(), getItinaryResult)



export default router