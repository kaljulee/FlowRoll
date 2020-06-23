import React from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';

function FlowRollContainer(props) {
  const { children } = props;
  return <Container>{children}</Container>;
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { roundTime },
  } = state;
  return {
    roundTime,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlowRollContainer);
