import React from 'react';
import {
  Text,
  Button,
  Container,
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import WeightedColumns from '../../components/WeightedColumns';
import TimeSetup from './TimeSetup';
import SpaceSetup from './SpaceSetup';
import ActivityLabel from './ActivityLabel';

function ScheduleControls(props) {
  const { participants, activeParticipants } = props;

  return (
    <Grid>
      <Row size={1} style={{ justifyContent: 'center' }}>
        <ActivityLabel label={'label'} color={'red'} />
      </Row>
      <Row size={4}>
        <SpaceSetup
          participants={participants}
          activeParticipants={activeParticipants}
        />
      </Row>
      <Row size={4}>
        <TimeSetup />
      </Row>
      <Row size={1}>
        <Button>
          <Text>Shrink / Fill</Text>
        </Button>
      </Row>
      <Row size={1}>
        <Text>Estimated End Time</Text>
      </Row>
    </Grid>
  );
}

function ScheduleOverview(props) {
  return (
    <Grid>
      <Row>
        <Text>view type radio buttons</Text>
      </Row>
      <Row>
        <Text>activity list</Text>
      </Row>
      <Row>
        <Text>total time</Text>
      </Row>
    </Grid>
  );
}

function TrainScheduler(props) {
  const { activeParticipants, participants } = props;

  return (
    <Container>
      <WeightedColumns>
        <ScheduleControls
          particiapnts={participants}
          activeParticipants={activeParticipants}
        />
        <ScheduleOverview />
      </WeightedColumns>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { groundRobin } = state;
  let activeParticipants = groundRobin.activeParticipants;
  let participants = groundRobin.participants;
  return { participants, activeParticipants };
};

TrainScheduler.defaultProps = {};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainScheduler);
