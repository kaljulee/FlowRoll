import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Text, Button, Container, Card, CardItem, Footer } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import LegManager from '../../components/LegManager';
import moment from 'moment';
import TrainTracker from '../../components/TrainTracker';
import {
  unscheduleLeg,
  addLegToSchedule,
  deleteLegType,
  editLegType,
  setDepartureTime,
} from '../../actions';
import {
  createAndSetMap,
  startTrain,
  timeInLocation,
  createAnnotatedMap,
} from '../../actions/thunks';
import { sumLegRunTimes } from '../../logic';
import ControlBar from '../../components/ControlBar';
import AddLegTypeModal from '../../components/modals/AddLegTypeModal';
import { formatSecondsToDisplay } from '../../helpers/time';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import _ from 'lodash';
import EditLegTypeModal from '../../components/modals/EditLegTypeModal';
import { getLegTypeByID } from '../../helpers/utils';

function TrainSchedule(props) {
  const {
    legs,
    legTypes,
    unscheduleLeg,
    deleteLegType,
    addLegToSchedule,
    createAnnotatedMap,
    elapsedSeconds,
    timeInLocation,
    location,
    createAndSetMap,
    map,
  } = props;

  const [showAddLegModal, setShowAddLegModal] = useState(false);
  const [totalTime, setTotalTime] = useState(sumLegRunTimes(legs));
  const [annotatedMap, setAnnotatedMap] = useState(createAnnotatedMap());
  const [displayTotalTime, setDisplayTotalTime] = useState(
    formatSecondsToDisplay(totalTime),
  );
  const [idToDelete, setIDToDelete] = useState(null);
  const [editLeg, _setEditLeg] = useState(undefined);
  const [localTime, setLocalTime] = useState(0);

  const unscheduleAllOfType = (id) => {
    console.log('would unschedule all of type ' + id);
  };

  const deleteType = (id) => {
    deleteLegType({ id });
    setIDToDelete(null);
  };

  const doStartTrain = () => {
    const { startTrain, setDepartureTime } = props;
    setDepartureTime(moment());
    startTrain();
  };

  const setEditLeg = (id) => {
    const type = getLegTypeByID(legTypes, id);
    _setEditLeg(type);
  };

  const unschedule = (id) => {
    unscheduleLeg({ legs: [id] });
  };
  const scheduleDefault = (id) => {
    addLegToSchedule({ legs: [{ legType: id }] });
  };

  // creates a map for navigation
  const onUpdatePress = useCallback(() => {
    createAndSetMap(legs);
  }, [legs, createAndSetMap]);

  useEffect(() => {
    const newSum = sumLegRunTimes(legs);
    setTotalTime(newSum);
    setDisplayTotalTime(formatSecondsToDisplay(newSum));
  }, [legs]);

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
            <LegManager
              onPressAvailableLeg={scheduleDefault}
              onPressActiveLeg={unschedule}
              onLongPressActiveLeg={unscheduleAllOfType}
              onLongPressAvailableLeg={setEditLeg}
              schedule={legs}
              available={legTypes}
            />
          </Row>
          <Row
            style={{ display: 'flex', justifyContent: 'space-between' }}
            size={1}>
            <Button onPress={() => setShowAddLegModal(true)}>
              <Text>Add New Type</Text>
            </Button>
            <Button success onPress={(legs) => onUpdatePress(legs)}>
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
            annotatedMap={annotatedMap}
            location={location}
            localTime={localTime}
          />
        </Col>
      </Grid>
      <AddLegTypeModal
        isVisible={showAddLegModal}
        closeModal={() => setShowAddLegModal(false)}
      />
      <EditLegTypeModal
        closeModal={() => setEditLeg(undefined)}
        editLeg={editLeg}
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
    trainSchedule: { legs, legTypes },
    navigation: { location, elapsedSeconds, map },
  } = state;
  return { legTypes, legs, elapsedSeconds, location, map };
};

const mapDispatchToProps = {
  addLegToSchedule,
  unscheduleLeg,
  deleteLegType,
  editLegType,
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
