const argv = require('yargs').argv;
const chalk = require('chalk');

const baseDirectory = require('../../util/constants').baseDirectoryPaths.CONTAINERS;
const fileNameType = require('../../util/constants').fileNameTypes.INDEX;
const endNameString = require('../../util/constants').endNameStrings.EMPTY;
const pathToTemplate = require('../../util/constants').templateFilePaths.CONTAINER_COMPONENT_UPDATE;

const checkArguments = require('../../util').checkArguments;
const parseInput = require('../../util').parseInput;
const compileStaticTemplate = require('../../util').compileStaticTemplate;
const compileUpdatedFileContent = require('../../util').compileUpdatedFileContent;
const resolveIdentifierImports = require('../../util').resolveIdentifierImports;
const resolveIdentifierContainerComponent = require('../../util').resolveIdentifierContainerComponent;
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
  camelCaseName: parsedInput.camelCaseName,
  pascalCaseName: parsedInput.pascalCaseName
};

const compiledTemplate = compileStaticTemplate({pathToTemplate, templateArguments});

let re1 = /import.*?}.from/ig;
let re2 = /\.propTypes (.|\s)*?};/ig;
let re3 = /mapStateToProps = (.|\s)*?}\);/ig;
let re4 = /mapDispatchToPropsObj(.|\s)*?};/ig;
let regexArray = [
  {regexExp: re1, FILE_FLAG: '} from', resolveIdentifier: resolveIdentifierImports, container: parsedInput.camelCaseContainerName},
  {regexExp: re2, FILE_FLAG: '};', resolveIdentifier: resolveIdentifierContainerComponent},
  {regexExp: re3, FILE_FLAG: '});', resolveIdentifier: resolveIdentifierContainerComponent},
  {regexExp: re4, FILE_FLAG: '};', resolveIdentifier: resolveIdentifierContainerComponent}
];

let compiledUpdatedFileContent = compileUpdatedFileContent({pathToFile: parsedInput.filePath, compiledTemplate, regexArray});

writeFile({newFilePath: parsedInput.filePath, content: compiledUpdatedFileContent});
