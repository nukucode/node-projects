const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
const { dbConfiguration } = require('./db/config');

/* configuration */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended }));
dotenv.config();
dbConfiguration();

/* listening */
app.listen(process.env.PORT || 3000, () => {
    console.log(chalk.blue(`listening on port ${process.env.PORT}`));
})