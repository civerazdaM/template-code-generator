const argv = require('yargs').argv;
const chalk = require('chalk');
const childProcess = require('child_process');

const checkArguments = require('../../util').checkArguments;

try{
  checkArguments(argv);
} catch (e) {
  console.log(chalk.red(e.message));
  return;
}

let {container, action, name} = argv;

childProcess.execSync(`node generators/react-redux/when-creating-new/constants.js --container=${container} --action=${action} --name=${name} --scriptName=make:constants`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/actions.js --container=${container} --action=${action} --name=${name} --scriptName=make:actions`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/sagas.js --container=${container} --action=${action} --name=${name} --scriptName=make:sagas`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/rootSaga.js --container=${container} --action=${action} --name=${name} --scriptName=register:saga`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/api.js --container=${container} --action=${action} --name=${name} --scriptName=make:api`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/reducer.js --container=${container} --action=${action} --name=${name} --scriptName=make:reducer`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/rootReducer.js --container=${container} --action=${action} --name=${name} --scriptName=register:reducer`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/selectors.js --container=${container} --action=${action} --name=${name} --scriptName=make:selectors`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/classComponent.js --container=${container} --action=${action} --name=${name} --scriptName=make:classComponent`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-creating-new/containerComponent.js --container=${container} --action=${action} --name=${name} --scriptName=make:containerComponent`, {stdio:[0,1,2]});
