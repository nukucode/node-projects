import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Routes from './routes/index.js';

/* configuration */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* .env config */
dotenv.config();

/* connection to the database */
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

/* routes */
app.use(Routes);

/* setup */
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`.blue);
})

