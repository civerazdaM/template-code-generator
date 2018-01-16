const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.CONTAINERS;
const fileNameType = require('../../util/constants').fileNameTypes.CAMEL_CASE_WITH_END_STRING;
const endNameString = require('../../util/constants').endNameStrings.REDUCER;
const pathToTemplate = require('../../util/constants').templateFilePaths.REDUCER_UPDATE;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const compileUpdatedFileContent = require('../../util').compileUpdatedFileContent;
const resolveIdentifierImports = require('../../util').resolveIdentifierImports;
const resolveIdentifierReducer = require('../../util').resolveIdentifierReducer;
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
  pascalCaseActionName: parsedInput.pascalCaseActionName,
  camelCaseName: parsedInput.camelCaseName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});

let re1 = /import.*?}.from/ig;
let re2 = /case(.|\s)*default:/ig;
let re3 = /initialState =(.|\s)*?}\);/ig;
let regexArray = [
  {regexExp: re1, FILE_FLAG: '} from', resolveIdentifier: resolveIdentifierImports, container: parsedInput.camelCaseContainerName},
  {regexExp: re2, FILE_FLAG: '    default:', resolveIdentifier: resolveIdentifierReducer},
  {regexExp: re3, FILE_FLAG: '});', resolveIdentifier: resolveIdentifierReducer}
];

let compiledUpdatedFileContent = compileUpdatedFileContent({pathToFile: parsedInput.filePath, compiledTemplate, regexArray});

writeFile({newFilePath: parsedInput.filePath, content: compiledUpdatedFileContent});
