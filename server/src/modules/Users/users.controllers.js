import {
  loginUser,
  registerUser,
  refreshAccessToken,
  logoutUser,
  getUserById
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

  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } =
      await loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });

  } catch (err) {
    next(err);
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
