import { Router } from "express";
import { getItinaryResult ,saveItninary, listAllItinary} from "../controllers/itinary.controller.js";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = new Router()
const upload = multer()

router.route("/generate-response").post(upload.none(), getItinaryResult)
router.route("/save-itinary").post(upload.none(), varifyJWT, saveItninary)
router.route("/list-all-itinary").post(varifyJWT, listAllItinary)



export default router