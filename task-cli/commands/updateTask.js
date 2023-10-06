import inquirer from 'inquirer';
import ora from 'ora'
import chalk from 'chalk'
import { connectDB, disconnectDB } from '../db/config.js';
import Tasks from '../models/taskModel.js';
import { getTaskCode } from '../utils/getTaskCode.js';

export async function askUpdateQ(todo) {
    try {
        // Prompting the user to update the todo data
        const update = await inquirer.prompt([
            { name: "name", message: 'Update the name?', type: 'input', default: todo.name },
            { name: "detail", message: 'Update the description?', type: 'input', default: todo.detail },
            { name: "status", message: 'Update the status?', type: 'list', choices: ['pending', 'completed'], default: todo.status }
        ])

        return update;
    } catch (error) {
        console.log('Something went wrong... \n', error)
    }
}


export default async function updateTask() {
    try {
        // Obtaining the task code entered by user by calling getTaskCode() method
        const taskCode = await getTaskCode();

        // Connecting to the database
        await connectDB()

        // Starting the spinner
        const spinner = ora("Finding the todo...").start();

        // Finding the todo which the user wants to update
        const todo = await Tasks.findOne({ code: taskCode.code })

        // stopping the spinner
        spinner.stop();

        // Checking if the todo exists
        if (!todo) {
            console.log(chalk.redBright('Could not find a Todo with the code you provided.'))
        } else {
            console.log(chalk.blueBright('Type the updated properties. Press Enter if you don\'t want to update the data.'))

            // Get the user's response of the updated data by calling askUpdateQ() method
            const update = await askUpdateQ(todo)

            // If user marked status as completed, we delete the todo else we update the data
            if (update.status === 'completed') {
                // Changing the spinner text and staring it again
                spinner.text = "Deleting the todo...";
                spinner.start();

                // Deleting the todo
                await Tasks.deleteOne({ _id: todo._id });

                // Stopping the spinner and display the success message
                spinner.stop()
                console.log(chalk.greenBright('Deleted the todo.'))
            } else {
                // Update the todo
                spinner.text = 'Updating the todo'
                spinner.start()
                await Todos.updateOne({ _id: todo._id }, update, { runValidators: true })
                spinner.stop()
                console.log(chalk.greenBright('Updated the todo.'))
            }
        }
        // Disconnecting from the databases/
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}