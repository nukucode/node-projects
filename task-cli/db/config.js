import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import ora from 'ora'
import chalk from 'chalk'

// => connecting to MongoDB
export async function connectDB() {
    try {
        const spinner = ora('Connecting to the database...').start();
        mongoose.connect(process.env.MONGODB_URL)
        spinner.stop()
        console.log(chalk.blueBright('Successfully connected to database!!!'))
    } catch (error) {
        console.log(chalk.redBright('Error: '), error);
        process.exit(1)
    }
}

// => disconnecting to MongoDB
export async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log(chalk.blueBright('Disconnected from the database.'));
    } catch (error) {
        console.log(chalk.redBright('Error: '), error);
        process.exit(1)
    }
}