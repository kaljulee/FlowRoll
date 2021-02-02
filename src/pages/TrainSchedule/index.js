import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

function TrainSchedule(props) {
  return (
    <Grid>
      <Col size={3} style={{ borderWidth: 5 }}>
        <Text>various controls and data</Text>
      </Col>
      <Col size={1} style={{ borderWidth: 5 }}>
        <Text>train schedule visualization</Text>
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
