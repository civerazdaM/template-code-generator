const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.CONTAINERS;
const fileNameType = require('../../util/constants').fileNameTypes.CAMEL_CASE_WITH_END_STRING;
const endNameString = require('../../util/constants').endNameStrings.REDUCER;
const pathToTemplate = require('../../util/constants').templateFilePaths.REDUCER;

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
  constantActionName: parsedInput.constantActionName,
  pascalCaseActionName: parsedInput.pascalCaseActionName,
  camelCaseName: parsedInput.camelCaseName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});
writeFile({newFilePath: parsedInput.filePath, content: compiledTemplate});
