const fs = require('fs');
const path = require('path');
const changeCase = require('change-case');
const handlebars = require('handlebars');
const chalk = require('chalk');

const fileNameTypes = require('./constants').fileNameTypes;
const baseDirectoryPaths = require('./constants').baseDirectoryPaths;

function createFileName({fileNameType, endNameString, camelCaseContainerName, pascalCaseContainerName}) {
  switch (fileNameType) {
    case fileNameTypes.PASCAL_CASE:
      return `${pascalCaseContainerName}.js`;
    case fileNameTypes.INDEX:
      return 'index.js';
    case fileNameTypes.CAMEL_CASE_WITH_END_STRING:
      return `${camelCaseContainerName}${endNameString}.js`;
    case fileNameTypes.ROOT_REDUCER:
      return 'reducers.js';
    case fileNameTypes.ROOT_SAGA:
      return 'sagas.js';
    default:
      return;
  }
}

function createFilePath({baseDirectory, fileName, pascalCaseContainerName, pascalCaseName, scriptName}) {
  if(baseDirectory === baseDirectoryPaths.CONTAINERS && scriptName === 'make:classComponent') {
    return `${baseDirectory}/${pascalCaseContainerName}Page/components/${pascalCaseName}/${fileName}`;
  }
  if(baseDirectory === baseDirectoryPaths.CONTAINERS){
    return `${baseDirectory}/${pascalCaseContainerName}Page/${fileName}`;
  }
  return `${baseDirectory}/${fileName}`;
}

function createMissingDirectories(filepath) {
  let dirname = path.dirname(filepath);

  if (!fs.existsSync(dirname)) {
    createMissingDirectories(dirname);
  }

  if(!fs.existsSync(filepath)){
    fs.mkdirSync(filepath);
  }
}

const checkArguments = function (argv) {
    if(!argv.container || !argv.action || !argv.name) {
        throw new Error(`Container, action, name parameters are required for ${argv.scriptName} script!
You can pass it like this:
npm run ${argv.scriptName} -- --container=container --action=action --name=name`);
    }
};

const parseInput = function ({argv, baseDirectory, fileNameType, endNameString }) {
  let {container, action, name, scriptName} = argv;
  let camelCaseContainerName = changeCase.camelCase(container);
  let pascalCaseContainerName = changeCase.pascalCase(container);
  let camelCaseActionName = changeCase.camelCase(action);
  let pascalCaseActionName = changeCase.pascalCase(action);
  let constantActionName = changeCase.constantCase(action);
  let camelCaseName = changeCase.camelCase(name);
  let pascalCaseName = changeCase.pascalCase(name);
  let fileName = createFileName({fileNameType, endNameString, camelCaseContainerName, pascalCaseContainerName});
  let filePath = createFilePath({baseDirectory, fileName, pascalCaseContainerName, pascalCaseName, scriptName});
  return {
    camelCaseContainerName,
    pascalCaseContainerName,
    camelCaseActionName,
    pascalCaseActionName,
    constantActionName,
    camelCaseName,
    pascalCaseName,
    fileName,
    filePath
  }
};

const compileStaticTemplate = function ({pathToTemplate, templateArguments}) {
  const template = fs.readFileSync(pathToTemplate);
  return handlebars.compile(template.toString())(templateArguments);
};

const writeFile = function ({newFilePath, content}) {
  createMissingDirectories(newFilePath.substring(0, newFilePath.lastIndexOf('/')));
  fs.writeFile(newFilePath, content, err => {
    if (err) {
      return console.error(`Autsch! Failed to store template: ${err.message}.`);
    }
    console.log(chalk.green(`Saved template to ${newFilePath}!`));
  });
};

module.exports = {
  checkArguments,
  parseInput,
  compileStaticTemplate,
  writeFile
}
