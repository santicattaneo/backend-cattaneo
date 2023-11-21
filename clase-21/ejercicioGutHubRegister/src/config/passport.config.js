import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import usersModel from '../models/users.model.js';

const initializePassport = () => {
    //registro con github
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.290078788bcff5c6',
        clientSecret: '0ce6c7109520a6043a49a9eb3bcea100f00420bb',
        callbackURL: 'http://localhost:8080/api/sessions/github-callback',
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.email[0].value;
            const user = await usersModel.findOne({ email });
            if(!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                };
                const result = await usersModel.create(newUser);
                return done(null, result);
            } else {
                return done(null, user);
            };
        } catch (error) {
            return done('incorrect credentials');
        };
    }));
    //serializacion y deserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async(id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);
    });
};

export{
    initializePassport
};