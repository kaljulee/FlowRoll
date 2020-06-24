import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { setStartTimeStamp } from '../../actions';
import moment from 'moment';

function TimeKeeperContainer(props) {
  const { children, roundTime, startTimeStamp, setStartTimeStamp } = props;
  const initialDisplayValue = startTimeStamp
    ? moment().diff(startTimeStamp, 'seconds')
    : 0;
  const [displayTime, setDisplayTime] = useState(initialDisplayValue);
  const [activeTimer, setActiveTimer] = useState(null);
  function clearTimer() {
    clearInterval(activeTimer);
    setActiveTimer(null);
    setDisplayTime(0);
  }

  useEffect(() => {
    let intervalID;
    if (startTimeStamp) {
      intervalID = setInterval(() => {
        const timeDiff = moment().diff(startTimeStamp, 'seconds');
        setDisplayTime(timeDiff);
      }, 1000);
      setActiveTimer(intervalID);
    }
    return () => {
      setActiveTimer(null);
      clearInterval(intervalID);
    };
  }, [startTimeStamp]);

  function beginTimer() {
    setDisplayTime(0);
    setStartTimeStamp(moment());
  }

  return (
    <Container>
      <Text>{displayTime}</Text>
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
    basicReducer: { roundTime, startTimeStamp },
  } = state;
  return {
    roundTime,
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
