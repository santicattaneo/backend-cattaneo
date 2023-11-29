import express from "express";
import { __dirname } from "./utils.js";
import authRouter from './routes/auth.router.js';
import { initializePassport } from './config/passport.config.js';
import passport from "passport";
import cookieParser from 'cookie-parser';


const app = Express();

app.use(express.json());
app.use(express.urlencoded({ extender: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use('/api/auth', authRouter);

app.listen(8080, () => console.log('Listening on port 8080'));