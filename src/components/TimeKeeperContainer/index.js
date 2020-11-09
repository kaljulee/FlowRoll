import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {
  startTimerRun,
  timerRollover,
  expireTimer,
  setElapsedSeconds,
} from '../../actions';
import { useTimerExpired, useElapsedTime } from '../../helpers/hooks';

function TimeKeeperContainer(props) {
  const {
    children,
    startTimeStamp,
    startTimerRun,
    timerRollover,
    endTimeStamp,
    setElapsedSeconds,
  } = props;
  const timerDebugControls = false;
  const { elapsedTime, resetTimer } = useElapsedTime(
    startTimeStamp,
    endTimeStamp,
  );

  function beginTimer() {
    startTimerRun();
  }

  const expired = useTimerExpired(endTimeStamp, elapsedTime);

  useEffect(() => {
    setElapsedSeconds(elapsedTime);
    if (expired) {
      expireTimer();
      setTimeout(timerRollover, 500);
    } else {
    }
  }, [expired, timerRollover, elapsedTime, setElapsedSeconds]);

  return (
    <Container>
      <Text>{elapsedTime}</Text>
      {timerDebugControls && (
        <Button onPress={beginTimer}>
          <Text>start</Text>
        </Button>
      )}
      {timerDebugControls && (
        <Button onPress={() => resetTimer()}>
          <Text>clear timer</Text>
        </Button>
      )}
      {children}
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { roundDuration, startTimeStamp, endTimeStamp },
  } = state;
  return {
    endTimeStamp,
    roundDuration,
    startTimeStamp,
  };
};

const mapDispatchToProps = {
  startTimerRun,
  expireTimer,
  timerRollover,
  setElapsedSeconds,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeKeeperContainer);
