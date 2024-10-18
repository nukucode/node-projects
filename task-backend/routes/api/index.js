import express from 'express';
import { route } from './auth.js';

const router = express.Router();

router.use("/auth", route)

export {router}