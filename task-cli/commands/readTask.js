import chalk from 'chalk'
import ora from 'ora'
import { connectDB, disconnectDB } from '../db/config.js';
import Tasks from '../models/taskModel.js'

export default async function readTask() {
    try {
        // connecting to database
        await connectDB();

        // starting the spinner
        const spinner = ora('Fetching all todos...').start()

        // fetching all the todos from the database 
        const todos = await Tasks.find({})

        // stopping the spinner
        spinner.stop()

        // check if todos exist or not
        if (todos.length === 0) {
            console.log(chalk.blueBright('You do not have any tasks yet!'))
        } else {
            todos.forEach((todo) => {
                console.log(
                    chalk.cyanBright('Todo Code: ') + todo.code + '\n' +
                    chalk.blueBright('Name: ') + todo.name + '\n' +
                    chalk.yellowBright('Description: ') + todo.detail + '\n'
                )
            })
        }
        
        // disconnect from the database
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}