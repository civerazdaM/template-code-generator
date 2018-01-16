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

childProcess.execSync(`node generators/react-redux/when-updating-existing/constants.js --container=${container} --action=${action} --name=${name} --scriptName=update:constants`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-updating-existing/actions.js --container=${container} --action=${action} --name=${name} --scriptName=update:actions`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-updating-existing/sagas.js --container=${container} --action=${action} --name=${name} --scriptName=update:sagas`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-updating-existing/rootSaga.js --container=${container} --action=${action} --name=${name} --scriptName=update:rootSaga`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-updating-existing/api.js --container=${container} --action=${action} --name=${name} --scriptName=update:api`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-updating-existing/reducer.js --container=${container} --action=${action} --name=${name} --scriptName=update:reducer`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-updating-existing/selectors.js --container=${container} --action=${action} --name=${name} --scriptName=update:selectors`, {stdio:[0,1,2]});
childProcess.execSync(`node generators/react-redux/when-updating-existing/containerComponent.js --container=${container} --action=${action} --name=${name} --scriptName=update:containerComponent`, {stdio:[0,1,2]});
