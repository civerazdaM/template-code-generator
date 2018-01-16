const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.API;
const fileNameType = require('../../util/constants').fileNameTypes.CAMEL_CASE_WITH_END_STRING;
const endNameString = require('../../util/constants').endNameStrings.API;
const pathToTemplate = require('../../util/constants').templateFilePaths.API_UPDATE;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const compileUpdatedFileContent = require('../../util').compileUpdatedFileContent;
const writeFile = require('../../util').writeFile;

try{
  checkArguments(argv);
} catch (e) {
  console.log(chalk.red(e.message));
  return;
}

const parsedInput = parseInput({argv, baseDirectory, fileNameType, endNameString });

const templateArguments = {
  camelCaseActionName: parsedInput.camelCaseActionName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});

let compiledUpdatedFileContent = compileUpdatedFileContent({pathToFile: parsedInput.filePath, compiledTemplate});

writeFile({newFilePath: parsedInput.filePath, content: compiledUpdatedFileContent});
