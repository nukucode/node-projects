import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import Tasks from '../models/taskModel.js';
import { connectDB, disconnectDB } from '../db/config';
import { getTaskCode } from '../utils/getTaskCode.js';



export default async function deleteTask() {
    try {
        // Obtaining the todo code provided by user
        const userCode = await getTaskCode()

        // Connecting to the database
        await connectDB()

        // Starting the spinner
        const spinner = ora('Finding and Deleting the todo...').start()

        // Deleting the task
        const response = await Tasks.deleteOne({ code: userCode });

        // Stopping the spinner
        spinner.stop();

        // Checking the delete operation
        if (response.deletedCount === 0) {
            console.log(chalk.redBright('Could not find any todo matching the provided name. Deletion failed.'))
        } else {
            console.log(chalk.greenBright('Deleted Task Successfully'))
        }

        // Disconnecting from the database
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}