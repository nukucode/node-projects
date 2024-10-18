import mongoose from 'mongoose';
import chalk from "chalk";
import { log } from '../hooks/hook.js';

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      log(chalk.blue("MongoDb Connected"));
    })
    .catch((err) => {
      log(chalk.red("MongoDb Not Connected", err.message));
    });
};
