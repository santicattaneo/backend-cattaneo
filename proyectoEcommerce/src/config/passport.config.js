import passport from 'passport';
import session from 'express-session';
import jwt from 'passport-jwt';
import { passportStrategiesEnum } from './enums.config.js';
import configs from '../config/config.js'
import local from 'passport-local';
import usersModel from '../dao/mongo/models/users.model.js';
import { createHash, isValidPassword } from '../utils/utils.js';
import GitHubStrategy from 'passport-github2';

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(passportStrategiesEnum.JWT, new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: configs.privateKeyJwt
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        };
    }));

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, age } = req.body;
            const user = await usersModel.findOne({ email: username });
            if(user) {
                return done(null, false);
            };
            const userToSave = {
                first_name,
                last_name,
                email: username,
                age,
                password: createHash(password)
            };
            const result = await usersModel.create(userToSave);
            return done(null, result);
        } catch (error) {
            return done('incorrect credentials');
        };
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async ( username, password, done) => {
        try {
            const user = await usersModel.findOne({ email: username });
            if(!user || !isValidPassword(password, user.password)) {
                return done(null, false);
            };
            return done(null, user);
        } catch (error) {
            return done('incorrect credentials');
        };
    }));

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.b9e29173fe2b8290',
        clientSecret: '1f320858f4a7360e9f27250cf9df13b362a8cc4d',
        callbackURL: 'http://localhost:8080/api/sessions/githubcb',
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await usersModel.findOne({ email });
            if(!user) {
                const userToSave = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                };
                const result = await usersModel.create(userToSave);
                return done(null, result);
            } else {
                return done(null, user);
            };
        } catch (error) {
            return done('incorrect credentials');
        };
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;