import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { startTimerRun, timerRollover } from '../../actions';
import {
  useTimerExpired,
  useElapsedTime,
} from '../../helpers/hooks';

function TimeKeeperContainer(props) {
  const {
    children,
    startTimeStamp,
    startTimerRun,
    timerRollover,
      endTimeStamp,
  } = props;
  const timerDebugControls = false;
  const { elapsedTime, clearTimer, activeTimer } = useElapsedTime(
    startTimeStamp,
  );

  function beginTimer() {
    startTimerRun();
  }


  const expired = useTimerExpired(endTimeStamp, elapsedTime);

  useEffect(() => {
    if (expired) {
      console.log('expired');
      timerRollover();
    } else {
      console.log('not expired');
    }
  }, [expired]);

  return (
    <Container>
      <Text>{elapsedTime}</Text>
      {timerDebugControls && (
        <Button onPress={beginTimer}>
          <Text>start</Text>
        </Button>
      )}
      {timerDebugControls && (
        <Button onPress={() => clearTimer()}>
          <Text>clear timer</Text>
        </Button>
      )}
      {children}
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { roundDuration, startTimeStamp, endTimeStamp, },
  } = state;
  return {
    endTimeStamp,
    roundDuration,
    startTimeStamp,
  };
};

const mapDispatchToProps = {
  startTimerRun,
  timerRollover,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeKeeperContainer);
