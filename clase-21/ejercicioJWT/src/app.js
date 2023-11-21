import express from "express";
import { __dirname } from "./utils.js";
import authRouter from './routes/auth.router.js';

const app = Express();

app.use(express.json());
app.use(express.urlencoded({ extender: true }));
app.use(express.static(`${__dirname}/public`));

app.use('/api/auth', authRouter);

app.listen(8080, () => console.log('Listening on port 8080'));