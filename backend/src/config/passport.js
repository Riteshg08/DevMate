const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // check if this Google account has signed in before
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // no account yet - create one using info Google gave us
                user = new User({
                    googleId: profile.id,
                    firstName: profile.name.givenName || "Google",
                    lastName: profile.name.familyName || "User",
                    email: profile.emails[0].value.toLowerCase(),
                    photoUrl: profile.photos[0]?.value
                });
                await user.save();
            }

            done(null, user);
        } catch (err) {
            done(err, null);
        }
    }
));

module.exports = passport;