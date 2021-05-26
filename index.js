const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "employee.html");

const render = require("./lib/htmlpage");


const roster = [];

function chooseNewEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to add?",
            name: "name",
            choices: ["Engineer", "Intern", "Manager", "None, all done!"],
        },
    ]).then(val => {
        if (val.name === "Engineer") {
            addEngineer();
        } else if (val.name === "Intern") {
            addIntern();
        } else if (val.name === "Manager") {
            addManager();
        } else if (val.name === "That'all, nothing else.") {
            generateHTML(outputPath, render(roster));
        };
    });
}

// Function to add an Engineer profile
function addEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the engineer?",
            name: "name",
        },
        {
            type: "input",
            message: "What is their ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is their email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is their GitHub username?",
            name: "github",
        },
    ]).then(function(answer) {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        roster.push(engineer);
        chooseNewEmployee();
    });
}

// Function to add an Intern profile
function addIntern() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the intern's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the intern's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "Which school do they attend?",
            name: "school",
        },
    ]).then(function(answer) {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        roster.push(intern);
        chooseNewEmployee ();        
    });
}

// Function to add a Manager profile
function addManager() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the manager's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "number",
        },
    ]).then(function(answer) {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.number)
        roster.push(manager);
        chooseNewEmployee();
    });
}

// Function to generate the HTML file
function generateHTML() {
    fs.writeFileSync(outputPath, render(roster),"utf-8");
    console.log("Team page successfully created!");
}

chooseNewEmployee();