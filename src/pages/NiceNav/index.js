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
import ControlBar from '../../components/ControlBar';
import { setDepartureTime } from '../../actions';
import { formatSecondsToDisplay } from '../../helpers/time';
import KeepAwake from 'react-native-keep-awake';
import moment from 'moment';
import { Grid, Row, Col } from 'react-native-easy-grid';
import TrainTracker, { TrainRails } from '../../components/TrainTracker';
import {
  createAnnotatedMap,
  startTrain,
  timeInLocation,
} from '../../actions/thunks';
import { TIE_TYPES } from '../../components/TrainTracker/tieTypes';
import { getLocationByID } from '../../logic';
import { getRouteTypeByID } from '../../helpers/utils';

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

/////////////////////////////////////
// train area
//// abs position tracks
//// train grid
///// global data windows
/////// current time
//// local time front
//// cowcatcher bottom
// todo make the text sizes grow to fill parent
// todo this should not require routeTypes, that should get sorted out higher up
function TrainDisplay(props) {
  const { localTime, locationData, routeTypes } = props;
  const defaultLocalTimeBackgroundColor = '#b87333';
  const { runTime } = locationData;
  const route = getRouteTypeByID(routeTypes, locationData.routeType);
  const localTimeBackgroundColor = route
    ? route.color
    : defaultLocalTimeBackgroundColor;
  return (
    <View style={{ height: '100%' }}>
      <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <TrainRails />
      </View>
      <Grid
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Row size={1} style={{ backgroundColor: 'blue' }} />
        <Row size={4} style={{ backgroundColor: 'blue' }}>
          <Col>
            <Row size={2} style={{ backgroundColor: 'black' }}>
              <Text style={{ color: 'white' }}>now label</Text>
            </Row>
            <Row size={2} style={{ backgroundColor: 'black' }}>
              <Text style={{ color: 'white' }}>now hms</Text>
            </Row>
            <Row size={1} style={{ backgroundColor: 'blue' }} />
          </Col>
          <Col>
            <Row style={{ backgroundColor: 'black' }}>
              <Text style={{ color: 'white' }}>remaining time</Text>
            </Row>
            <Row />
          </Col>
          <Col>
            <Row size={2} style={{ backgroundColor: 'black' }}>
              <Text style={{ color: 'white' }}>end label</Text>
            </Row>
            <Row size={2} style={{ backgroundColor: 'black' }}>
              <Text style={{ color: 'white' }}>end hms</Text>
            </Row>
            <Row size={1} style={{ backgroundColor: 'blue' }} />
          </Col>
        </Row>
        <Row
          size={8}
          style={{
            backgroundColor: localTimeBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 100,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
            adjustFontSizeToFit={true}>
            {formatSecondsToDisplay(runTime - localTime)}
          </Text>
        </Row>
        <Row size={1}>
          <CowCatcher />
        </Row>
      </Grid>
    </View>
  );
}

function TrackDisplay(props) {
  const { annotatedMap, location } = props;
  return (
    <TrainTracker
      enforcedPosition={0}
      map={annotatedMap}
      defaultTieType={TIE_TYPES.NAV}
      location={location}
    />
  );
}

function CowCatcher(props) {
  return (
    <View
      style={{
        borderRadius: 8,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}
    />
  );
}

// //////////////////////////////////
// control functions
function onPressPlay() {}

function onPressRestart() {}

function onPressPause() {}

///////////////////////////////////////
// export component
function NiceNav(props) {
  const {
    map,
    location,
    createAnnotatedMap,
    elapsedSeconds,
    departureTime,
    timeInLocation,
    startTrain,
    setDepartureTime,
    routeTypes,
  } = props;
  const [annotatedMap, setAnnotatedMap] = useState(createAnnotatedMap());
  const [localTime, setLocalTime] = useState(0);

  useEffect(() => {
    setAnnotatedMap(createAnnotatedMap());
  }, [createAnnotatedMap, map]);

  // todo use hook
  // updates local time when relavant info changes
  useEffect(() => {
    setLocalTime(timeInLocation());
  }, [elapsedSeconds, localTime, location, timeInLocation]);

  const doStartTrain = () => {
    setDepartureTime(moment());
    startTrain();
  };

  return (
    <Container>
      <Grid>
        <Row size={4} style={{ justifyContent: 'center' }}>
          <View style={{ width: '95%' }}>
            <TrainDisplay
              locationData={getLocationByID(map.locations, location)}
              routeTypes={routeTypes}
              localTime={localTime}
              elapsedSeconds={elapsedSeconds}
              departureTime={departureTime}
            />
          </View>
        </Row>
        <Row size={8}>
          <TrackDisplay
            annotatedMap={annotatedMap}
            location={location}
            localTime={localTime}
          />
        </Row>
      </Grid>
      <KeepAwake />
      <Footer>
        <ControlBar
          onPressPlay={doStartTrain}
          onPressPause={() => console.log('press pause')}
          onPressRestart={() => {
            console.log('press restart');
          }}
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
    trainSchedule: { routeTypes },
    navigation: { departureTime, map, location, elapsedSeconds },
  } = state;

  return {
    routeTypes,
    map,
    departureTime,
    elapsedSeconds,
    location,
  };
};

const mapDispatchToProps = {
  setDepartureTime,
  createAnnotatedMap,
  timeInLocation,
  startTrain,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NiceNav);
