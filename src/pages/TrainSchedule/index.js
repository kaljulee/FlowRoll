import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Text, Button, Container, Card, CardItem, Footer } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import LegManager from '../../components/LegManager';
import TrainTracker from '../../components/TrainTracker';
import {
  unscheduleLeg,
  addLegToSchedule,
  deleteLegType,
  editLegType,
  setTrainSchedule,
  setTrainRoute,
} from '../../actions';
import ControlBar from '../../components/ControlBar';
import AddLegTypeModal from '../../components/modals/AddLegTypeModal';
import { hourMinuteSecond, sumLegRunTimes } from '../../helpers/time';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import _ from 'lodash';
import EditLegTypeModal from '../../components/modals/EditLegTypeModal';

function TrainSchedule(props) {
  const {
    legs,
    legTypes,
    unscheduleLeg,
    deleteLegType,
    setTrainRoute,
    addLegToSchedule,
    route,
  } = props;

  const [showAddLegModal, setShowAddLegModal] = useState(false);
  const [hmsTotalTime, setHmsTotalTime] = useState(sumLegRunTimes(legs));
  const [displayTotalTime, setDisplayTotalTime] = useState(
    hourMinuteSecond(hmsTotalTime),
  );
  const [idToDelete, setIDToDelete] = useState(null);
  const [editLeg, _setEditLeg] = useState(undefined);

  const unscheduleAllOfType = (id) => {
    console.log('would unschedule all of type ' + id);
  };

  const deleteType = (id) => {
    deleteLegType({ id });
    setIDToDelete(null);
  };

  const setEditLeg = (id) => {
    const type = _.find(legTypes, (l) => l.id === id);
    _setEditLeg(type);
  };

  const unschedule = (id) => {
    unscheduleLeg({ legs: [id] });
  };
  const scheduleDefault = (id) => {
    addLegToSchedule({ legs: [{ legType: id }] });
  };

  const onUpdatePress = useCallback(() => {
    setTrainRoute({ route: legs });
  }, [legs, setTrainRoute]);

  useEffect(() => {
    const newSum = sumLegRunTimes(legs);
    setHmsTotalTime(newSum);
    setDisplayTotalTime(hourMinuteSecond(newSum));
  }, [legs]);

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
          <TrainTracker route={route} />
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
          onPressPlay={() => console.log('press play')}
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
    basicReducer: { legTypes, trainSchedule },
    trainSchedule: { route },
  } = state;
  return { legTypes, legs: trainSchedule.legs, route };
};

const mapDispatchToProps = {
  addLegToSchedule,
  unscheduleLeg,
  deleteLegType,
  editLegType,
  setTrainRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainSchedule);
