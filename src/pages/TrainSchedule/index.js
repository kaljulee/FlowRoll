import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, Button, Container, Card, CardItem } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import LegManager from '../../components/LegManager';
import TrainTracker from '../../components/TrainTracker';
import { unscheduleLeg, addLegToSchedule, deleteLegType } from '../../actions';
import AddLegTypeModal from '../../components/modals/AddLegTypeModal';
import { hourMinuteSecond, sumLegDurations } from '../../helpers/time';

function TrainSchedule(props) {
  const {
    legs,
    legTypes,
    unscheduleLeg,
    deleteLegType,
    addLegToSchedule,
  } = props;

  const [showAddLegModal, setShowAddLegModal] = useState(false);
  const [hmsTotalTime, setHmsTotalTime] = useState(sumLegDurations(legs));
  const [displayTotalTime, setDisplayTotalTime] = useState(
    hourMinuteSecond(hmsTotalTime),
  );

  const unscheduleAllOfType = (id) => {
    console.log('would unschedule all of type ' + id);
  };

  const deleteType = (id) => {
    console.log(`would delete type ${id}`);
  };
  const unschedule = (id) => {
    unscheduleLeg({ legs: [id] });
  };
  const scheduleDefault = (id) => {
    addLegToSchedule({ legs: [{ legType: id }] });
  };

  useEffect(() => {
    const newSum = sumLegDurations(legs);
    setHmsTotalTime(newSum);
    setDisplayTotalTime(hourMinuteSecond(newSum));
  }, [legs]);

  return (
    <Container>
      <Grid>
        <Col size={3} style={{ borderWidth: 5 }}>
          <Row size={4}>
            <LegManager
              onPressAvailableLeg={scheduleDefault}
              onPressActiveLeg={unschedule}
              onLongPressActiveLeg={unscheduleAllOfType}
              onLongPressAvailableLeg={deleteType}
              schedule={legs}
              available={legTypes}
            />
          </Row>
          <Row size={1}>
            <Button onPress={() => setShowAddLegModal(true)}>
              <Text>Add New Type</Text>
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
        <Col size={1} style={{ borderWidth: 5 }}>
          <TrainTracker />
        </Col>
      </Grid>
      <AddLegTypeModal
        isVisible={showAddLegModal}
        closeModal={() => setShowAddLegModal(false)}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { legTypes, trainSchedule },
  } = state;
  return { legTypes, legs: trainSchedule.legs };
};

const mapDispatchToProps = {
  addLegToSchedule,
  unscheduleLeg,
  deleteLegType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainSchedule);
