const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.CONTAINERS;
const fileNameType = require('../../util/constants').fileNameTypes.CAMEL_CASE_WITH_END_STRING;
const endNameString = require('../../util/constants').endNameStrings.SAGAS;
const pathToTemplate = require('../../util/constants').templateFilePaths.SAGAS_UPDATE;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const compileUpdatedFileContent = require('../../util').compileUpdatedFileContent;
const resolveIdentifierImports = require('../../util').resolveIdentifierImports;
const writeFile = require('../../util').writeFile;

try{
  checkArguments(argv);
} catch (e) {
  console.log(chalk.red(e.message));
  return;
}

const parsedInput = parseInput({argv, baseDirectory, fileNameType, endNameString });

const templateArguments = {
  constantActionName: parsedInput.constantActionName,
  camelCaseActionName: parsedInput.camelCaseActionName,
  camelCaseName: parsedInput.camelCaseName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});

let re1 = /import.*?}.from/ig;
let regexArray = [{regexExp: re1, FILE_FLAG: '} from', resolveIdentifier: resolveIdentifierImports, container: parsedInput.camelCaseContainerName}];
let compiledUpdatedFileContent = compileUpdatedFileContent({pathToFile: parsedInput.filePath, compiledTemplate, regexArray});

writeFile({newFilePath: parsedInput.filePath, content: compiledUpdatedFileContent});
