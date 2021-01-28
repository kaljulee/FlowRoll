import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { STATUS } from '../../helpers/utils';
import {
  startTimerRun,
  timerRollover,
  expireTimer,
  setElapsedSeconds,
  resetTimer,
} from '../../actions';
import { useTimerExpired, useElapsedTime } from '../../helpers/hooks';

// import sound module
var Sound = require('react-native-sound');
// enable playback ins slience mode
Sound.setCategory('Playback');
var startSound = new Sound('respawn_beep_1.mp3', Sound.MAIN_BUNDLE, (err) => {
  if (err) {
    console.log('failed to load sound', err);
    return;
  }
});
var endSound = new Sound('respawn_beep_2.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load sound', error);
    return;
  }
});

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
    status,
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
    // if start of round, play start sound
    if (elapsedTime === 0 && status === STATUS.ROUND) {
      startSound.play();
    }
    // play end sound at round expire
    if (expired) {
      if (status === STATUS.ROUND) {
        endSound.play();
      }
      expireTimer();
      setTimeout(timerRollover, 1000);
    } else {
      setElapsedSeconds(elapsedTime, 'TimeKeeperContainer');
    }
  }, [
    expired,
    timerRollover,
    elapsedTime,
    setElapsedSeconds,
    status,
    expireTimer,
  ]);

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
    basicReducer: { status, roundDuration, startTimeStamp, endTimeStamp },
  } = state;
  return {
    status,
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
