import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {
  startTimerRun,
  timerRollover,
  expireTimer,
  setElapsedSeconds,
  resetTimer,
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
    expireTimer,
    resetTimer,
  } = props;
  const timerDebugControls = false;
  const [initialized, setInitialized] = useState(false);
  const { elapsedTime, resetElapsedTime } = useElapsedTime(
    startTimeStamp,
    endTimeStamp,
  );
  if (!initialized) {
    resetElapsedTime();
    resetTimer();
    setInitialized(true);
  }

  function beginTimer() {
    startTimerRun();
  }

  const expired = useTimerExpired(endTimeStamp, elapsedTime);

  // either expire the timer or update elapsed seconds
  useEffect(() => {
    if (expired) {
      expireTimer();
      setTimeout(timerRollover, 1000);
    } else {
      setElapsedSeconds(elapsedTime, 'TimeKeeperContainer');
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
        <Button onPress={() => resetElapsedTime()}>
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
  resetTimer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeKeeperContainer);
