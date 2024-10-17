import express from 'express';
import { dbConnect } from './config/db.js'
import { log } from "./hooks/hook.js";
import  chalk from 'chalk';
import 'dotenv/config'
import { router } from './routes/index.js';

// Configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(router);

// Listening
app.listen(process.env.PORT || 3000, () =>
  log(
    chalk.blueBright(
      `Server Started On Prot: http://localhost:${process.env.PORT}`
    )
  ) 
);
