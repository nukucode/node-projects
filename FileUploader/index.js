import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import Routes from './routes/index.js';

/* configuration */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();


/* routes */
app.use(Routes);


app.listen(process.env.PUBLIC_PORT, () => {
    console.log(colors.blue(`Server running on port ${process.env.PUBLIC_PORT}`));
})
