import {
  loginUser,
  registerUser,
  refreshAccessToken,
  logoutUser,
  getUserById,
  sendotpService,
  verifyotpService,
  resetPasswordService,
  resendOtpService,
  updateUserProfileService
} from "./users.service.js";

export const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } =
      await registerUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
    res.status(201).json({ message: "User registered successfully", accessToken ,refreshToken,user:{email:req.body.email} ,id:req.user.id});

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
    next()
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } =
      await loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

   res.status(200).json(user);

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
    next();
  }
};

export const refreshController = async (req, res, next) => {
  try {
    const { newAccessToken, newRefreshToken } =
      await refreshAccessToken(req.cookies.refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    const updatedUser = await updateUserProfileService(
      userId,
      req.body
    );

    res.status(200).json({
      success: true,
      user: updatedUser
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export const logoutController = async (req, res, next) => {
  try {
    await logoutUser(req.user.id);

    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });

  } catch (err) {
    next(err);
  }
};

export const sendotpController = async (req, res, next) => {
  try {
    const { email } = req.body;

    await sendotpService(email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (err) {
    return next(err);
  }
};

export const verifyotpController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    await verifyotpService(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (err) {
    return next(err);
  }
};
export const resendOtpController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await resendOtpService(email);

    return res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    });

  } catch (err) {
    return next(err);
  }
};
export const resetPasswordController = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and newPassword are required",
      });
    }

    await resetPasswordService(email, newPassword);

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};