import React from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import LegList from '../LegList';

function LegManager(props) {
  return (
    <Grid>
      <Row>
        <Col>
          <Text>Legs</Text>
          <LegList />
        </Col>
        <Col>
          <Text>Route</Text>
          <LegList />
        </Col>y
      </Row>
    </Grid>
  );
}

export default LegManager;
