import React from 'react';
import { Text, Button, Container } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import WeightedColumns from '../../components/WeightedColumns';
import TimeSetup from './TimeSetup';
import SpaceSetup from './SpaceSetup';
import ActivityLabel from './ActivityLabel';
import EstTotalTime from './EstTotalTime';

function ScheduleControls(props) {
  const { participants, activeParticipants } = props;

  const rowStyle = {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
    paddingBottom: 2,
    paddingTop: 2,
  };

  return (
    <Grid style={{ padding: 5 }}>
      <Row size={1} style={rowStyle}>
        <ActivityLabel label={'label'} color={'red'} />
      </Row>
      <Row size={3} style={rowStyle}>
        <SpaceSetup
          participants={participants}
          activeParticipants={activeParticipants}
        />
      </Row>
      <Row size={5} style={rowStyle}>
        <TimeSetup />
      </Row>
      <Row size={1} style={rowStyle}>
        <Button
          style={{
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
            }}>
            Shrink / Fill
          </Text>
        </Button>
      </Row>
      <Row size={1} style={rowStyle}>
        <EstTotalTime />
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
