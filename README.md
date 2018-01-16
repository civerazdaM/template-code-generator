# React - Redux

We extracted boilerplate code regarding making async calls in some container to templates for each entity in container component.
We are using handlebars for templates. 
We also wanted this project to be able to update to update any project on our computer, and to be on its own. 
So, first thing we want to do when we want to use this scripts is to go to config/index.js and change projectPath variable to match path of project we want to write to.

### Creating Container Component
We have then templates for constants, actions, api, sagas, rootSaga, reducer, rootReducer, selectors, containerComponent and classComponent when creating new container component.

**Usage**

We can create new container component by running in terminal this command:
```terinal
npm run make:container -- --container=value --action=value --name=value
```

We specify name of container we want to create. If we type container=example it will create directory named ExamplePage, so this script adds Page suffix to all container components it creates.

We specify name of action we want to do. If we type action=getSomething it will create for us getSomethingRequest, getSomethingSuccess, getSomethingFailure actions, and respected constants for this actions.

We specify name of response we are getting from server, Uf we type name=something we will store response from server in reducer under something variable.

### Updating Container Component

We have then templates for constants, actions, api, sagas, rootSaga, reducer, selectors and containerComponent when uodating specific container component.

**Usage**

We can update specific container component by running in terminal this command:
```terinal
npm run update:container -- --container=value --action=value --name=value
```

Parameters provided to this scripts are regarding same parts of template codes as in creating new container component.

