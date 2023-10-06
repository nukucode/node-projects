import inquirer from 'inquirer';

export async function getTaskCode() {
    try {
        // Promoting the user to enter the todo code
        const answers = await inquirer.prompt([
            { name: 'code', 'message': 'Enter the code of the todo: ', type: 'code' }
        ])

        // Trimming user's response so that the todo code does not contain any starting or trailing white spaces
        answers.code = answers.code.trim()

        return answers
    } catch (error) {
        console.log('Something went wrong...\n', error)
    }
}