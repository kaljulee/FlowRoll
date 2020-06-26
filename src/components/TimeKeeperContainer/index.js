import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { setStartTimeStamp } from '../../actions';
import moment from 'moment';
import { useElapsedTime } from '../../helpers/hooks';

function TimeKeeperContainer(props) {
  const { children, roundDuration, startTimeStamp, setStartTimeStamp } = props;

  const { elapsedTime, clearTimer, activeTimer } = useElapsedTime(
    startTimeStamp,
  );

  function beginTimer() {
    // setDisplayTime(0);
    setStartTimeStamp(moment());
  }

  return (
    <Container>
      <Text>{elapsedTime}</Text>
      <Button onPress={beginTimer}>
        <Text>start</Text>
      </Button>
      <Button onPress={() => clearTimer()}>
        <Text>clear timer</Text>
      </Button>
      {children}
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { roundDuration, startTimeStamp },
  } = state;
  return {
      roundDuration,
    startTimeStamp,
  };
};

const mapDispatchToProps = {
  setStartTimeStamp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeKeeperContainer);
