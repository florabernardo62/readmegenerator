// Including packages needed for this application
//Requirement met: GIVEN a command-line application that accepts user input
const inquirer = require('inquirer');
const fs = require('fs');

// Array of questions for user input
// Requirement met: WHEN I am prompted for information about my application repository
const questions = [
  {
    //Input to add a title to the project. 
    // Requirement met: WHEN I enter my project title, THEN this is displayed as the title of the README
    type: 'input',
    name: 'title',
    message: "What is the title of this project?",
  },
  {
    //Input to add a description to the project
    // Requirement me: WHEN I enter a description, THEN this information is added to the sections of the README entitled "Description"
    type: 'input',
    name: 'description',
    message: "How would you describe this project?",
  },
  {
    //Input to add installation instructions 
    //Requirement me: WHEN I enter installation instructions,THEN this information is added to the sections of the README entitled "Installation"
    type: 'input',
    name: 'installation',
    message: "What are the installation instructions?",
  },
  {
    // Input to add usage infromation
    //WHEN I enter the usage information, THEN this information is added to the sections of the README entitled "Usage"
    type: 'input',
    name: 'usage',
    message: "What is the necessary usage information?",
  },
  {
    //Input to add contribution guidelines
    // WHEN I enter the contribution guidelines, THEN this information is added to the sections of the README entitled "Contributing"
    type: 'input',
    name: 'contributing',
    message: "What are the contribution guidelines?",
  },
  {
    //Input to add testing information
    //WHEN I enter the test instructions, THEN this information is added to the sections of the README entitled "Tests"
    type: 'input',
    name: 'tests',
    message: "What are the test instructions?",
  },
  {
    // Input to add the license type
    // Requirement met: WHEN I choose a license for my application from a list of options
    // THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
    type: 'list',
    name: 'license',
    message: "What is the license for your application?",
    // Array used to meet the requirement of chosing from opitions. 
    // Choices presented here are the same choices presented when creating a repository on github 
    choices: 
            ['None',
            'Apache License 2.0',
            'GNU General Public License v3.0',
            'MIT License',
            'BSD 2-Clause "Simplified" License',
            'BSD 3-Clause "New" or "Revised" License',
            'Boost Software License 1.0',
            'Creative Commons Zero v1.0 Universal',
            'Eclipse Public License 2.0',
            'GNU Affero General Public License v3.0',
            'GNU General Public License v2.0',
            'GNU Lesser General Public License v2.1',
            'Mozilla Public License 2.0',
            'The Unlicense'],
  },
  { 
    // Input to add your github username 
    // Requirement met: WHEN I enter my GitHub username, THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
    type: 'input',
    name: 'github',
    message: "What is your GitHub username?",
  },
  {
    // Input to add your email address 
    // WHEN I enter my email address, THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
    type: 'input',
    name: 'email',
    message: "What is your email address?",
  },
  {
    type: 'input',
    name: 'screenshot',
    message: "Enter the file path or URL of a screenshot for your deployed application (optional):",
  },
];

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('README file created successfully!');
    }
  });
}

// function to initialize app
function init() {
  inquirer.prompt(questions)
    .then((answers) => {
      const readmeContent = generateREADME(answers);
      writeToFile('README.md', readmeContent);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Call the function to initialize app
//Requirement met: WHEN I am prompted for information about my application repository
//THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
function generateREADME(answers) {
    // The following fuction deploys all the past requirement on its following section
    // The following fuction contains a table of content 
    // Requirement met: WHEN I click on the links in the Table of Contents, THEN I am taken to the corresponding section of the README
    let screenshotSection = '';
    if (answers.screenshot) {
      screenshotSection = `## Screenshot\n\n![Screenshot](${answers.screenshot})\n\n`;
    }
  return `
# ${answers.title}

${screenshotSection}

## Description
${answers.description}


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This application is covered under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For additional questions, you can reach me through:
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
`;
}

// Function call to initialize app
init();
