import React, { useState, useEffect } from 'react';
import { Container, Button, } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';

function FlowRollContainer(props) {
  const { children, roundTime } = props;

  const [displayTime, setDisplayTime] = useState(0);
  const [activeTimer, setActiveTimer] = useState(null);

  function clearTimer() {
    clearInterval(activeTimer);
    setActiveTimer(null);
    setDisplayTime(0);
  }

  useEffect(() => {
    console.log('starting timer');
    const interval = setInterval(() => setDisplayTime((t) => t + 1), 1000);
    if (interval !== activeTimer) {
      setActiveTimer(interval);
    }
    return () => {
      setActiveTimer(null);
      clearInterval(interval);
    };
  }, []);
  console.log('displaytime render ' + displayTime);

  return (
    <Container>
      <Text>{displayTime}</Text>
      <Button onPress={() => clearTimer()}><Text>clear timer</Text></Button>
      {children}
    </Container>
  );
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
