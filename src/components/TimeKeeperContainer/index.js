import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { startTimerRun, timerRollover } from '../../actions';
import moment from 'moment';
import { getEndTime } from '../../helpers/time';
import {
  useTimerExpired,
  useElapsedTime,
  useEndTime,
} from '../../helpers/hooks';

function TimeKeeperContainer(props) {
  const {
    children,
    roundDuration,
    startTimeStamp,
    startTimerRun,
    timerRollover,
  } = props;
  const timerDebugControls = false;
  const { elapsedTime, clearTimer, activeTimer } = useElapsedTime(
    startTimeStamp,
  );

  function beginTimer() {
    startTimerRun();
  }

  const endTime = useEndTime(startTimeStamp, roundDuration);

  const expired = useTimerExpired(endTime, elapsedTime);

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
    basicReducer: { roundDuration, startTimeStamp },
  } = state;
  return {
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
