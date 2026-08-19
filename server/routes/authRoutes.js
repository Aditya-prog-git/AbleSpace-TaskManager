const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required"
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        message: "Invalid Google credential"
      });
    }

    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      avatar:
        payload.name
          ?.split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "GU",
      picture: payload.picture,
      provider: "google"
    };

    res.json({
      message: "Google login successful",
      user
    });
  } catch (error) {
    console.error("Google authentication error:", error);

    res.status(401).json({
      message: "Invalid Google credential"
    });
  }
});

module.exports = router;