export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const { rows } = await pool.query(
      findUserRefreshTokensQuery,
      [decoded.id]
    );

    const storedToken = rows[0];

    if (!storedToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      storedToken.token
    );

    if (!isValid) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // 🔹 Create new tokens
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const hashedNewToken = await bcrypt.hash(newRefreshToken, 10);

    await pool.query(revokeRefreshTokenQuery, [storedToken.id]);
    await pool.query(insertRefreshTokenQuery, [
      decoded.id,
      hashedNewToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ]);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ accessToken: newAccessToken });

  } catch (error) {
    return res.status(401).json({ message: "Refresh failed" });
  }
};
