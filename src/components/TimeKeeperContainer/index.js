import React, { useState, useEffect } from 'react';
import { Container, Button } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { setStartTimeStamp } from '../../actions';
import moment from 'moment';
import { useElapsedTime } from '../../helpers/hooks';

function TimeKeeperContainer(props) {
  const { children, roundTime, startTimeStamp, setStartTimeStamp } = props;

  const { displayTime, clearTimer, activeTimer } = useElapsedTime(
    startTimeStamp,
  );

  function beginTimer() {
    // setDisplayTime(0);
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
