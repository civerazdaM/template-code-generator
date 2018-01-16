const fs = require('fs');
const path = require('path');
const changeCase = require('change-case');
const handlebars = require('handlebars');
const chalk = require('chalk');

const fileNameTypes = require('./constants').fileNameTypes;
const baseDirectoryPaths = require('./constants').baseDirectoryPaths;
const END_OF_IMPORT_ALL = require('./constants').END_OF_IMPORT_ALL;
const endNameStrings = require('./constants').endNameStrings;

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

function parseRegex({ originalFileContent, regex, results }) {
  let match;
  while (match = regex.regexExp.exec(originalFileContent)) {
    let identifier = regex.resolveIdentifier({data: originalFileContent, match});
    results.push({start: match.index, end: match[0].length - regex.FILE_FLAG.length, match: match[0], FILE_FLAG: regex.FILE_FLAG, identifier:identifier});
  }

  return results;
}

function insertStringAtPosition({originalString, stringToInsert, position}) {
  return originalString.substring(0, position) + stringToInsert + originalString.substring(position);
}

function prepareDataForInsert({ regexString, identifier, FILE_FLAG, compiledTemplate }) {
  if(!identifier.TEMPLATE_START_FLAG || !identifier.TEMPLATE_END_FLAG || !compiledTemplate.includes(identifier.TEMPLATE_START_FLAG) || !compiledTemplate.includes(identifier.TEMPLATE_END_FLAG)){
    return false;
  }
  return parseSingleRegexStatement({regexString, FILE_FLAG, identifier, compiledTemplate});
}

function parseSingleRegexStatement({ regexString, FILE_FLAG, identifier, compiledTemplate }){
  let unchangedPartOfRegex = regexString.substring(0, regexString.lastIndexOf(FILE_FLAG) - 1);
  let templatePartToInsert = compiledTemplate.substring( compiledTemplate.lastIndexOf(identifier.TEMPLATE_START_FLAG) + identifier.TEMPLATE_START_FLAG.length, compiledTemplate.lastIndexOf(identifier.TEMPLATE_END_FLAG));
  return {
    unchangedPartOfRegex,
    templatePartToInsert
  }
}

function modifySelectedRegex({originalString, preparedData, position}) {
  let modifiedRegex = insertStringAtPosition({originalString, stringToInsert: preparedData.unchangedPartOfRegex, position});
  modifiedRegex = insertStringAtPosition({originalString: modifiedRegex, stringToInsert: preparedData.templatePartToInsert, position: modifiedRegex.length});
  return modifiedRegex;
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

const compileUpdatedFileContent = function ({pathToFile, compiledTemplate, regexArray}) {
  let originalFileContent = fs.readFileSync(pathToFile).toString();

  let position = 0;
  let lastMatchedPosition = 0;
  let results = [];
  let updatedFileContent = '';

  regexArray && regexArray.map(regex => {
    results = parseRegex({ originalFileContent, regex, results });
  });

  if(results.length) {
    results.sort((a, b) => {
      if ( a.start < b.start ){
        return -1;
      }
      if ( a.start > b.start){
        return 1;
      }
      return 0;
    });
    updatedFileContent = results.reduce((acc, curr) => {
      if(curr.start > lastMatchedPosition) {
        let unchangedFileContent = originalFileContent.substring(lastMatchedPosition, curr.start);
        acc = insertStringAtPosition({originalString:acc, stringToInsert: unchangedFileContent, position});
        position = acc.length;
        lastMatchedPosition += unchangedFileContent.length;
      }
      let preparedData = prepareDataForInsert({ regexString: curr.match, identifier: curr.identifier, FILE_FLAG: curr.FILE_FLAG, compiledTemplate }) ;

      if(preparedData) {
        acc = modifySelectedRegex({originalString: acc, preparedData, position});
        position = acc.length;
        lastMatchedPosition += curr.end;
      }

      return acc;
    }, '');
  }

  if(lastMatchedPosition < originalFileContent.length) {
    updatedFileContent += originalFileContent.substring(lastMatchedPosition, originalFileContent.length);
  }

  if(compiledTemplate.includes(END_OF_IMPORT_ALL)){
    updatedFileContent += compiledTemplate.substring(compiledTemplate.lastIndexOf(END_OF_IMPORT_ALL) + END_OF_IMPORT_ALL.length, compiledTemplate.length);
  }

  return updatedFileContent;

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

const resolveIdentifierRootReducer = ({ data, match}) => {
  let regexString = match[0];
  let TEMPLATE_START_FLAG;
  let TEMPLATE_END_FLAG;
  if(regexString.includes('const rootReducer')){
    TEMPLATE_START_FLAG = '#START_OF_REDUCER_IMPORT';
    TEMPLATE_END_FLAG = '#END_OF_REDUCER_IMPORT';
  }
  if(regexString.includes('});')){
    TEMPLATE_START_FLAG = '#START_OF_REDUCER';
    TEMPLATE_END_FLAG = '#END_OF_REDUCER';
  }
  return {
    TEMPLATE_START_FLAG,
    TEMPLATE_END_FLAG
  }
};

const resolveIdentifierRootSaga = ({ data, match}) => {
  let regexString = match[0];
  let TEMPLATE_START_FLAG;
  let TEMPLATE_END_FLAG;
  if(regexString.includes('export default function* rootSaga')){
    TEMPLATE_START_FLAG = '#START_OF_SAGA_IMPORT';
    TEMPLATE_END_FLAG = '#END_OF_SAGA_IMPORT';
  }
  if(regexString.includes(']);')){
    TEMPLATE_START_FLAG = '#START_OF_SAGA';
    TEMPLATE_END_FLAG = '#END_OF_SAGA';
  }
  return {
    TEMPLATE_START_FLAG,
    TEMPLATE_END_FLAG
  }
};

const resolveIdentifierReducer = ({ data, match}) => {
  let regexString = match[0];
  let TEMPLATE_START_FLAG;
  let TEMPLATE_END_FLAG;
  if(regexString.includes('default:')){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_REDUCER_CASES';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_REDUCER_CASES';
  }
  if(regexString.includes('initialState')){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_INITIAL_STATE';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_INITIAL_STATE';
  }
  return {
    TEMPLATE_START_FLAG,
    TEMPLATE_END_FLAG
  }
}

const resolveIdentifierSelectors = ({ data, match}) => {
  let regexString = match[0];
  let TEMPLATE_START_FLAG;
  let TEMPLATE_END_FLAG;
  if(regexString.includes('export {')){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_SELECTOR';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_SELECTOR';
  }
  if(regexString.includes('}')){
    TEMPLATE_START_FLAG = '#START_OF_EXPORT_SELECTOR';
    TEMPLATE_END_FLAG = '#END_OF_EXPORT_SELECTOR';
  }
  return {
    TEMPLATE_START_FLAG,
    TEMPLATE_END_FLAG
  }
};

const resolveIdentifierContainerComponent = ({ data, match}) => {
  let regexString = data.substring(match.index, match.index + data.substring(match.index, data.length).indexOf(";") + 1);
  let TEMPLATE_START_FLAG;
  let TEMPLATE_END_FLAG;
  if(regexString.includes(".propTypes =")){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_PROP_TYPE';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_PROP_TYPE';
  }

  if(regexString.includes("mapStateToProps")){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_FROM_SELECTORS';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_FROM_SELECTORS';
  }

  if(regexString.includes("mapDispatchToProps")){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_DISPATCH';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_DISPATCH';
  }
  return {
    TEMPLATE_START_FLAG,
    TEMPLATE_END_FLAG
  }
}

function resolveIdentifierImports({ data, match}) {
  let regexString = data.substring(match.index, match.index + data.substring(match.index, data.length).indexOf(";") + 1);
  let TEMPLATE_START_FLAG;
  let TEMPLATE_END_FLAG;
  if(regexString.includes(changeCase.camelCase(this.container + endNameStrings.CONSTANTS))){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_CONSTANTS';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_CONSTANTS';
  }
  if(regexString.includes(changeCase.camelCase(this.container + endNameStrings.ACTIONS))){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_ACTIONS';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_ACTIONS';
  }

  if(regexString.includes(changeCase.camelCase(this.container + endNameStrings.API))){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_API';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_API';
  }

  if(regexString.includes(changeCase.camelCase(this.container + endNameStrings.SAGAS))){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_SAGA';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_SAGA';
  }
  if(regexString.includes(changeCase.camelCase(this.container + endNameStrings.SELECTORS))){
    TEMPLATE_START_FLAG = '#START_OF_IMPORT_SELECTORS';
    TEMPLATE_END_FLAG = '#END_OF_IMPORT_SELECTORS';
  }
  return {
    TEMPLATE_START_FLAG,
    TEMPLATE_END_FLAG
  }
}

const readMockFile = (filePath) => {
  return fs.readFileSync(filePath).toString() ;
}

module.exports = {
  checkArguments,
  parseInput,
  compileStaticTemplate,
  compileUpdatedFileContent,
  writeFile,
  resolveIdentifierRootReducer,
  resolveIdentifierRootSaga,
  resolveIdentifierReducer,
  resolveIdentifierSelectors,
  resolveIdentifierContainerComponent,
  resolveIdentifierImports,
  readMockFile
}
