import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getSomethingRequest, getAnotherRequest } from './exampleActions';
import { makeSelectIsGetSomethingInProgress, makeSelectIsGetSomethingFailed, makeSelectSomething, makeSelectIsGetAnotherInProgress, makeSelectIsGetAnotherFailed, makeSelectAnother } from './exampleSelectors';
import Spinner from "../../componentsCommon/Spinner";
import FailurePage from "../../componentsCommon/FailurePage";
import Something from './components/Something';

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
  isGetAnotherInProgress: PropTypes.bool.isRequired,
  isGetAnotherFailed: PropTypes.bool.isRequired,
  another: PropTypes.object,
  dispatchGetAnotherRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isGetSomethingInProgress: makeSelectIsGetSomethingInProgress(),
  isGetSomethingFailed: makeSelectIsGetSomethingFailed(),
  something: makeSelectSomething(),
  isGetAnotherInProgress: makeSelectIsGetAnotherInProgress(),
  isGetAnotherFailed: makeSelectIsGetAnotherFailed(),
  another: makeSelectAnother(),
});

const mapDispatchToPropsObj = {
  dispatchGetSomethingRequest: getSomethingRequest,
  dispatchGetAnotherRequest: getAnotherRequest,
};

export default connect(mapStateToProps, mapDispatchToPropsObj) (ExamplePage);
