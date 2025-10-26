import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/async-handler.js";



const generateAccessAnsResponseTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};


// register user
const resgisterUser = asyncHandler(async (req, res) => {
 
  const { fullName, email, password } = req.body;

  if (
    [fullName, email, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, `All fields are compulsary is required`);
  }


  const existedUser = await User.findOne({email});
  if (existedUser) {
    throw new ApiError(
      409,
      `User with email is already registered`
    );
  }


  const user = await User.create({
    fullName,
    email,
    password,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userCreated, "User created successfully"));
});

// login user
const loginUser = asyncHandler(async (req, res) => {


  const { email, password } = req.body;

  if (!email?.trim()) {
    throw new ApiError(400, "username or email required");
  }

  const userFound = await User.findOne({email}).select("-refreshToken");

  if (!userFound) {
    throw new ApiError(404, "User doesn't exist");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const isPasswordValid = await userFound.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password incorrect");
  }

  const { refreshToken, accessToken } = await generateAccessAnsResponseTokens(
    userFound._id
  );

  userFound.refreshToken = refreshToken;

  const loggedInUser = userFound.toObject();
  delete loggedInUser.password;
  delete loggedInUser.refreshToken;

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});


const logoutUser = asyncHandler(async (req, res) => {
 

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logout successfully"));
});



const isUserLoggedIn = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, "User is logged in"));
});

export {
    resgisterUser,
    loginUser,
    logoutUser,
    isUserLoggedIn
}