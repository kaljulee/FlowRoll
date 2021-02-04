import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, Button, Container } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import LegManager from '../../components/LegManager';
import TrainTracker from '../../components/TrainTracker';
import { unscheduleLeg, addLegToSchedule, deleteLegType } from '../../actions';
import AddLegTypeModal from '../../components/modals/AddLegTypeModal';

function TrainSchedule(props) {
  const {
    legs,
    legTypes,
    unscheduleLeg,
    deleteLegType,
    addLegToSchedule,
  } = props;

  const [showAddLegModal, setShowAddLegModal] = useState(false);

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

  return (
    <Container>
      <Grid>
        <Col size={3} style={{ borderWidth: 5 }}>
          <Row>
            <LegManager
              onPressAvailableLeg={scheduleDefault}
              onPressActiveLeg={unschedule}
              onLongPressActiveLeg={unscheduleAllOfType}
              onLongPressAvailableLeg={deleteType}
              schedule={legs}
              available={legTypes}
            />
          </Row>
          <Row>
            <Button onPress={() => setShowAddLegModal(true)}>
              <Text>Add New Type</Text>
            </Button>
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
