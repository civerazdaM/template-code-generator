const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.CONTAINERS;
const fileNameType = require('../../util/constants').fileNameTypes.INDEX;
const endNameString = require('../../util/constants').endNameStrings.EMPTY;
const pathToTemplate = require('../../util/constants').templateFilePaths.CONTAINER_COMPONENT;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const writeFile = require('../../util').writeFile;

try{
  checkArguments(argv);
} catch (e) {
  console.log(chalk.red(e.message));
  return;
}

const parsedInput = parseInput({argv, baseDirectory, fileNameType, endNameString });

const templateArguments = {
  camelCaseActionName: parsedInput.camelCaseActionName,
  pascalCaseActionName: parsedInput.pascalCaseActionName,
  camelCaseContainerName: parsedInput.camelCaseContainerName,
  pascalCaseContainerName: parsedInput.pascalCaseContainerName,
  camelCaseName: parsedInput.camelCaseName,
  pascalCaseName: parsedInput.pascalCaseName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});
writeFile({newFilePath: parsedInput.filePath, content: compiledTemplate});
