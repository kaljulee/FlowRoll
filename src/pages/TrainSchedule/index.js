import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Text, Button, Container, Card, CardItem, Footer } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import RouteManager from '../../components/RouteManager';
import moment from 'moment';
import TrainTracker from '../../components/TrainTracker';
import {
  unscheduleRoute,
  addRouteToSchedule,
  deleteRouteType,
  editRouteType,
  setDepartureTime,
} from '../../actions';
import {
  createAndSetMap,
  startTrain,
  timeInLocation,
  createAnnotatedMap,
} from '../../actions/thunks';
import { sumRouteRunTimes, ZERO_ENGINE } from '../../logic';
import ControlBar from '../../components/ControlBar';
import AddRouteTypeModal from '../../components/modals/AddRouteTypeModal';
import { formatSecondsToDisplay } from '../../helpers/time';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import _ from 'lodash';
import EditRouteTypeModal from '../../components/modals/EditRouteTypeModal';
import { getRouteTypeByID } from '../../helpers/utils';

function TrainSchedule(props) {
  const {
    routes,
    routeTypes,
    unscheduleRoute,
    deleteRouteType,
    addRouteToSchedule,
    createAnnotatedMap,
    elapsedSeconds,
    timeInLocation,
    location,
    createAndSetMap,
    map,
    engine,
  } = props;

  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [totalTime, setTotalTime] = useState(sumRouteRunTimes(routes, engine));
  const [annotatedMap, setAnnotatedMap] = useState(createAnnotatedMap());
  const [displayTotalTime, setDisplayTotalTime] = useState(
    formatSecondsToDisplay(totalTime),
  );
  const [idToDelete, setIDToDelete] = useState(null);
  const [editRoute, _setEditRoute] = useState(undefined);
  const [localTime, setLocalTime] = useState(0);

  const unscheduleAllOfType = (id) => {
    console.log('would unschedule all of type ' + id);
  };

  const deleteType = (id) => {
    deleteRouteType({ id });
    setIDToDelete(null);
  };

  const doStartTrain = () => {
    const { startTrain, setDepartureTime } = props;
    setDepartureTime(moment());
    startTrain();
  };

  const setEditRoute = (id) => {
    const type = getRouteTypeByID(routeTypes, id);
    _setEditRoute(type);
  };

  const unschedule = (id) => {
    unscheduleRoute({ routes: [id] });
  };
  const scheduleDefault = (id) => {
    addRouteToSchedule({ routes: [{ routeType: id }] });
  };

  // creates a map for navigation
  const onUpdatePress = useCallback(() => {
    createAndSetMap();
  }, [routes, createAndSetMap]);

  useEffect(() => {
    const newSum = sumRouteRunTimes(routes, engine);
    setTotalTime(newSum);
    setDisplayTotalTime(formatSecondsToDisplay(newSum));
  }, [routes, engine]);

  // todo make this a hook
  // updates local time when relavant info changes
  useEffect(() => {
    setLocalTime(timeInLocation());
  }, [elapsedSeconds, localTime, location, timeInLocation]);

  useEffect(() => {
    setAnnotatedMap(createAnnotatedMap());
  }, [createAnnotatedMap, map]);

  return (
    <Container>
      <Grid>
        <Col size={3} style={{ borderWidth: 5 }}>
          <Row size={6}>
            <RouteManager
              onPressAvailableRoute={scheduleDefault}
              onPressActiveRoute={unschedule}
              onLongPressActiveRoute={unscheduleAllOfType}
              onLongPressAvailableRoute={setEditRoute}
              schedule={routes}
              available={routeTypes}
            />
          </Row>
          <Row
            style={{ display: 'flex', justifyContent: 'space-between' }}
            size={1}>
            <Button onPress={() => setShowAddRouteModal(true)}>
              <Text>Add New Type</Text>
            </Button>
            <Button success onPress={(routes) => onUpdatePress(routes)}>
              <Text>Update</Text>
            </Button>
          </Row>
          <Row>
            <Card>
              <CardItem style={{ display: 'flex', flexDirection: 'column' }}>
                <Text>{'Est. Run Time'}</Text>
                <Text>{displayTotalTime}</Text>
              </CardItem>
            </Card>
          </Row>
        </Col>
        <Col size={1} style={{ borderWidth: 1 }}>
          <TrainTracker
            map={annotatedMap}
            location={location}
            localTime={localTime}
          />
        </Col>
      </Grid>
      <AddRouteTypeModal
        isVisible={showAddRouteModal}
        closeModal={() => setShowAddRouteModal(false)}
      />
      <EditRouteTypeModal
        closeModal={() => setEditRoute(undefined)}
        editRoute={editRoute}
      />
      <ConfirmDeleteModal
        idToDelete={idToDelete}
        confirmDelete={(id) => {
          deleteType(id);
        }}
        closeModal={() => setIDToDelete(null)}
      />
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
    trainSchedule: { routes, routeTypes },
    navigation: { location, elapsedSeconds, map },
    groundRobin,
  } = state;
  let engine = groundRobin.engine;
  return { routeTypes, routes, elapsedSeconds, location, map, engine };
};

TrainSchedule.defaultProps = {
  engine: ZERO_ENGINE,
};

const mapDispatchToProps = {
  addRouteToSchedule,
  unscheduleRoute,
  deleteRouteType,
  editRouteType,
  createAndSetMap,
  startTrain,
  setDepartureTime,
  timeInLocation,
  createAnnotatedMap,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainSchedule);
