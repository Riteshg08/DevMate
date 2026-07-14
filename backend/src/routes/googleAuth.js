const express = require("express");
const passport = require("passport");

const googleAuthRouter = express.Router();

// Step A: redirect the user to Google's login/consent screen
googleAuthRouter.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step B: Google redirects back here after the user approves
googleAuthRouter.get("/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login" }),
    async (req, res) => {
        // req.user was set by passport in the strategy above
        const token = await req.user.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        // send them back to the frontend, already logged in
        res.redirect("http://localhost:5173/feed");
    }
);

module.exports = { googleAuthRouter };