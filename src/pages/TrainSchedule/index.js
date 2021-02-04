import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import LegManager from '../../components/LegManager';
import TrainTracker from '../../components/TrainTracker';
import { unscheduleLeg, addLegToSchedule, deleteLegType } from '../../actions';

function TrainSchedule(props) {
  const {
    legs,
    legTypes,
    unscheduleLeg,
    deleteLegType,
    addLegToSchedule,
  } = props;
  const unscheduleAllOfType = (id) => {
    console.log('would unschedule all of type ' + id);
  };

  const deleteType = (id) => {
    console.log(`would delete type ${id}`);
  };
  const unschedule = (id) => {
    unscheduleLeg({legs: [id]});
  };
  const scheduleDefault = (id) => {
    addLegToSchedule({ legs: [{ legType: id }] });
  };

  return (
    <Grid>
      <Col size={3} style={{ borderWidth: 5 }}>
        <LegManager
          onPressAvailableLeg={scheduleDefault}
          onPressActiveLeg={unschedule}
          onLongPressActiveLeg={unscheduleAllOfType}
          onLongPressAvailableLeg={deleteType}
          schedule={legs}
          available={legTypes}
        />
      </Col>
      <Col size={1} style={{ borderWidth: 5 }}>
        <TrainTracker />
      </Col>
    </Grid>
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
