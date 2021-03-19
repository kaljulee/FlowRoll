import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Container,
  Footer,
  View,
} from 'native-base';
import { connect } from 'react-redux';
import { findMatchUpByID, STATUS } from '../../helpers/utils';
import ControlBar from '../../components/ControlBar';
import TotalTimeTracker from '../../components/TotalTimeTracker';
import { setDepartureTime } from '../../actions';
import { secondsToHMS, hourMinuteSecond } from '../../helpers/time';
import KeepAwake from 'react-native-keep-awake';
import moment from 'moment';
import { Grid, Row, Col } from 'react-native-easy-grid';

const cardStyle = {
  width: '90%',
  alignSelf: 'center',
};

const cardItemStyle = {
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 25,
};

const styles = StyleSheet.create({
  currentMatchup: {
    ...cardStyle,
    flex: 3,
  },
  timerDisplay: {
    ...cardStyle,
    flex: 6,
  },
  timerDisplayText: {
    fontSize: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  roundCounter: {
    ...cardStyle,
    flex: 2,
  },
  totalTimeTracker: {
    ...cardStyle,
    flex: 2,
  },
  nextMatchup: {
    ...cardStyle,
    flex: 2,
  },
  container: {
    height: '100%',
  },
  content: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
});

function TrainDisplay(props) {
  return (
    <Grid>
      <Col>
        <Row>
          <Text>now label</Text>
        </Row>
        <Row>
          <Text>now hms</Text>
        </Row>
      </Col>
      <Col>
        <Row>
          <Text>remaining time</Text>
        </Row>
        <Row>
          <Text>filler</Text>
        </Row>
      </Col>
      <Col>
        <Row>
          <Text>end label</Text>
        </Row>
        <Row>
          <Text>end hms</Text>
        </Row>
      </Col>
    </Grid>
  );
}

function TrackDisplay(props) {
  return <View />;
}

function CowCatcher(props) {
  return <View />;
}

function onPressPlay() {}

function onPressRestart() {}

function onPressPause() {}

function NiceNav(props) {
  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <TrainDisplay />
        <TrackDisplay />
        <CowCatcher />
        <KeepAwake />
      </Content>
      <Footer>
        <ControlBar
          onPressPlay={onPressPlay}
          onPressPause={onPressPause}
          onPressRestart={onPressRestart}
        />
      </Footer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    groundRobin: {
      participants,
      warmUp,
      roundTime,
      coolDown,
      currentRound,
      roundCount,
      cycle,
      matchUps,
      timerDuration,
    },
    navigation: { departureTime },
  } = state;

  return {
    departureTime,
    cycle,
    participants,
    currentRound,
    roundCount,
    matchUps,
    timerDuration,
    warmUp,
    coolDown,
    roundTime,
  };
};

const mapDispatchToProps = {
  setDepartureTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NiceNav);
