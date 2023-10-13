import * as fs from "fs";
import inquirer from 'inquirer';

const FILES_LOCATION = "./files";

const getJsonFiles = (filePath) => {
  const allFiles = fs.readdirSync(filePath)
  const jsonRegex = /\w+\.json$/;

  return allFiles.filter(file => jsonRegex.test(file));
}

// Get list of JSON files in the files folder
const fileList = getJsonFiles(FILES_LOCATION);

// Use Inquirer to ask which of the files we should load in
const question = [
  {
    type: 'list',
    name: 'file',
    message: 'Which file do you want to load?',
    choices: fileList,
    filter(choice) {
      return choice.toLowerCase();
    },
  },
]

const chosenFile = await inquirer.prompt(question).then((answer) => {
  return answer.file;
});

// Read in the chosen file
const tracks = JSON.parse(fs.readFileSync( FILES_LOCATION + "/" + chosenFile))

// Generate the new format
const trackList = tracks.map(( track, index) => {
  console.log(`${index+1}. - ${track.artist} - ${track.title} [${track.label}]`);

  return `${index+1}. ${track.artist} - ${track.title} [${track.label}]`;
});

// Build up the output
let outputString = "";

for (const track of trackList) {
  outputString += track + '\n';
}

// Write out the file
const outputFileName = chosenFile.replace(/\.json$/, '.txt')

fs.writeFileSync(FILES_LOCATION + "/" + outputFileName, outputString);
