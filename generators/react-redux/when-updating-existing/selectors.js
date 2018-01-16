const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.CONTAINERS;
const fileNameType = require('../../util/constants').fileNameTypes.CAMEL_CASE_WITH_END_STRING;
const endNameString = require('../../util/constants').endNameStrings.SELECTORS;
const pathToTemplate = require('../../util/constants').templateFilePaths.SELECTORS_UPDATE;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const compileUpdatedFileContent = require('../../util').compileUpdatedFileContent;
const writeFile = require('../../util').writeFile;
const resolveIdentifierSelectors = require('../../util').resolveIdentifierSelectors;

try{
  checkArguments(argv);
} catch (e) {
  console.log(chalk.red(e.message));
  return;
}

const parsedInput = parseInput({argv, baseDirectory, fileNameType, endNameString });

const templateArguments = {
  pascalCaseActionName: parsedInput.pascalCaseActionName,
  camelCaseContainerName: parsedInput.camelCaseContainerName,
  pascalCaseContainerName: parsedInput.pascalCaseContainerName,
  camelCaseName: parsedInput.camelCaseName,
  pascalCaseName: parsedInput.pascalCaseName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});

let re1 = /(.|\s)export {/ig;
let re2 = /export {(.|\s)*}/ig;
let regexArray = [{regexExp: re1, FILE_FLAG: 'export {', resolveIdentifier: resolveIdentifierSelectors}, {regexExp: re2, FILE_FLAG: '}', resolveIdentifier: resolveIdentifierSelectors}];

let compiledUpdatedFileContent = compileUpdatedFileContent({pathToFile: parsedInput.filePath, compiledTemplate, regexArray});

writeFile({newFilePath: parsedInput.filePath, content: compiledUpdatedFileContent});
