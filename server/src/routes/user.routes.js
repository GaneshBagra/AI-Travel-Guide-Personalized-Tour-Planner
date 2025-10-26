import {Router} from 'express';
import { isUserLoggedIn, loginUser, logoutUser, resgisterUser } from '../controllers/user.controller.js';
import { varifyJWT } from "../middlewares/auth.middleware.js";
import multer from 'multer';

const router = new Router();
const upload = multer();

// route to register

router.route("/register").post(
  upload.none(),
  resgisterUser
);

// route to login

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(varifyJWT, logoutUser);
router.route("/isUserLoggedIn").post(varifyJWT, isUserLoggedIn);


export default router;