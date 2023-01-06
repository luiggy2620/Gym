const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../model/Admin');
                                                                    
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    const admin = await Admin.findOne({ email }).exec();
    if (!admin) {
        return done(null, false, {message: 'User not found'});
    } else {
        const match = await admin.matchPassword(password);
        if (match) {
            return done(null, admin);
        } else {
            return done(null, false, {message: 'Incorrect password'});
        }
    }
}));

passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
        done(err, admin);
    })
});