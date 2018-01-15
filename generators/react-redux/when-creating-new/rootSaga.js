const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.SRC;
const fileNameType = require('../../util/constants').fileNameTypes.ROOT_SAGA;
const endNameString = require('../../util/constants').endNameStrings.EMPTY;
const pathToTemplate = require('../../util/constants').templateFilePaths.ROOT_SAGA;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const compileUpdatedFileContent = require('../../util').compileUpdatedFileContent;
const resolveIdentifierRootSaga = require('../../util').resolveIdentifierRootSaga;
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
  camelCaseContainerName: parsedInput.camelCaseContainerName,
  pascalCaseContainerName: parsedInput.pascalCaseContainerName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});

let re1 = /(.|\s)export default function\* rootSaga/ig;
let re2 = /export default function\* rootSaga(.|\s)*]\);/ig;
let regexArray = [{regexExp: re1, FILE_FLAG: '\n\nexport default function* rootSaga', resolveIdentifier: resolveIdentifierRootSaga}, {regexExp: re2, FILE_FLAG: '  ]);', resolveIdentifier: resolveIdentifierRootSaga}];

let compiledUpdatedFileContent = compileUpdatedFileContent({pathToFile: parsedInput.filePath, compiledTemplate, regexArray});

writeFile({newFilePath: parsedInput.filePath, content: compiledUpdatedFileContent});
