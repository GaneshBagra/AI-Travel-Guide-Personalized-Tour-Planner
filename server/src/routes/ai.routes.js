import { Router } from "express";
import { getItinaryResult ,saveItninary, listAllItinary} from "../controllers/itinary.controller.js";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { getSuggestedTrips } from "../controllers/suggestedTripas.controller.js";

const router = new Router()
const upload = multer()


router.route("/save-itinary").post(upload.none(), varifyJWT, saveItninary)
router.route("/list-all-itinary").post(varifyJWT, listAllItinary)

// Public route - Get suggested trips
router.route("/suggested-trips").get(getSuggestedTrips);
router.route("/generate-response").post(upload.none(), getItinaryResult)

export default router