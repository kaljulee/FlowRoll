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
import TrainTracker from '../../components/TrainTracker';
import { createAnnotatedMap } from '../../actions/thunks';
import { TIE_TYPES } from '../../components/TrainTracker/tieTypes';

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

// todo make the text sizes grow to fill parent
function TrainDisplay(props) {
  return (
    <Grid
      style={{
        position: 'absolute',
        // todo standardize z indicies into layers or something
        zIndex: 2,
        borderWidth: 3,
        borderColor: 'yellow',
        height: '30%',
        width: '100%',
        backgroundColor: 'grey',
      }}>
      <Row size={1} style={{ backgroundColor: 'blue' }}>
        <Col>
          <Row style={{ backgroundColor: 'black' }}>
            <Text style={{ color: 'white' }}>now label</Text>
          </Row>
          <Row style={{ backgroundColor: 'black' }}>
            <Text style={{ color: 'white' }}>now hms</Text>
          </Row>
        </Col>
        <Col>
          <Row style={{ backgroundColor: 'black' }}>
            <Text style={{ color: 'white' }}>remaining time</Text>
          </Row>
          <Row>
            <Text>filler</Text>
          </Row>
        </Col>
        <Col>
          <Row style={{ backgroundColor: 'black' }}>
            <Text style={{ color: 'white' }}>end label</Text>
          </Row>
          <Row style={{ backgroundColor: 'black' }}>
            <Text style={{ color: 'white' }}>end hms</Text>
          </Row>
        </Col>
      </Row>
      <Row size={3} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 120,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
          adjustFontSizeToFit={true}>
          00:00
        </Text>
      </Row>
    </Grid>
  );
}

function TrackDisplay(props) {
  const { annotatedMap } = props;
  return <TrainTracker map={annotatedMap} defaultTieType={TIE_TYPES.NAV} />;
}

function CowCatcher(props) {
  return <View />;
}

function onPressPlay() {}

function onPressRestart() {}

function onPressPause() {}

function NiceNav(props) {
  const { map, location, localTime, createAnnotatedMap } = props;
  const [annotatedMap, setAnnotatedMap] = useState(createAnnotatedMap());

  useEffect(() => {
    setAnnotatedMap(createAnnotatedMap());
  }, [createAnnotatedMap, map]);

  return (
    <Container>
      <TrainDisplay />
      <TrackDisplay
        annotatedMap={annotatedMap}
        location={location}
        localTime={localTime}
      />
      <CowCatcher />
      <KeepAwake />
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
    navigation: { departureTime, map },
  } = state;

  return {
    map,
    // departureTime,
    // cycle,
    // participants,
    // currentRound,
    // roundCount,
    // matchUps,
    // timerDuration,
    // warmUp,
    // coolDown,
    // roundTime,
  };
};

const mapDispatchToProps = {
  setDepartureTime,
  createAnnotatedMap,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NiceNav);
