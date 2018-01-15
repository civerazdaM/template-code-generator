const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.SRC;
const fileNameType = require('../../util/constants').fileNameTypes.ROOT_REDUCER;
const endNameString = require('../../util/constants').endNameStrings.EMPTY;
const pathToTemplate = require('../../util/constants').templateFilePaths.ROOT_REDUCER;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const compileUpdatedFileContent = require('../../util').compileUpdatedFileContent;
const resolveIdentifierRootReducer = require('../../util').resolveIdentifierRootReducer;
const writeFile = require('../../util').writeFile;

try{
  checkArguments(argv);
} catch (e) {
  console.log(chalk.red(e.message));
  return;
}

const parsedInput = parseInput({argv, baseDirectory, fileNameType, endNameString });

const templateArguments = {
  camelCaseContainerName: parsedInput.camelCaseContainerName,
  pascalCaseContainerName: parsedInput.pascalCaseContainerName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});

let re1 = /(.|\s)const rootReducer/ig;
let re2 = /const rootReduce(.|\s)*}\);/ig;
let regexArray = [{regexExp: re1, FILE_FLAG: '/\nconst rootReducer', resolveIdentifier: resolveIdentifierRootReducer}, {regexExp: re2, FILE_FLAG: '});', resolveIdentifier: resolveIdentifierRootReducer}];

let compiledUpdatedFileContent = compileUpdatedFileContent({pathToFile: parsedInput.filePath, compiledTemplate, regexArray});

writeFile({newFilePath: parsedInput.filePath, content: compiledUpdatedFileContent});
