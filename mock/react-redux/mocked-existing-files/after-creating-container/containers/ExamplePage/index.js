import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getSomethingRequest } from './exampleActions';
import { makeSelectIsGetSomethingInProgress, makeSelectIsGetSomethingFailed, makeSelectSomething } from './exampleSelectors';
import Spinner from "../../componentsCommon/Spinner";
import FailurePage from "../../componentsCommon/FailurePage";
import Something from './components/Something/index';

class ExamplePage extends Component {

  componentWillMount(){
    this.props.dispatchGetSomethingRequest();
  }

  render() {
    let { isGetSomethingInProgress, isGetSomethingFailed, something } = this.props;
    let isLoading = !something;
    let isFailed = isGetSomethingFailed;

    if(isFailed){
      return(<FailurePage />);
    }

    if(isLoading){
      return(<Spinner />);
    }

    return (<Something something={ something.toJS() } />);
  }
}

ExamplePage.propTypes = {
  isGetSomethingInProgress: PropTypes.bool.isRequired,
  isGetSomethingFailed: PropTypes.bool.isRequired,
  something: PropTypes.object,
  dispatchGetSomethingRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isGetSomethingInProgress: makeSelectIsGetSomethingInProgress(),
  isGetSomethingFailed: makeSelectIsGetSomethingFailed(),
  something: makeSelectSomething(),
});

const mapDispatchToPropsObj = {
  dispatchGetSomethingRequest: getSomethingRequest,
};

export default connect(mapStateToProps, mapDispatchToPropsObj) (ExamplePage);
