import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import LegManager from '../../components/LegManager';
import TrainTracker from '../../components/TrainTracker';

function TrainSchedule(props) {
  return (
    <Grid>
      <Col size={3} style={{ borderWidth: 5 }}>
        <LegManager />
      </Col>
      <Col size={1} style={{ borderWidth: 5 }}>
        <TrainTracker />
      </Col>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainSchedule);
