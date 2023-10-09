const mongoose = require('mongoose');

export const dbConfiguration = () => {
    mongoose.connect(process.env.MONGODB_URL, {
    })
}