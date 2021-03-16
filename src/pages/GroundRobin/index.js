import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Footer, Button, Text } from 'native-base';
import { resetDB,
  // setWork
} from '../../actions';
import { createAndSetEngine } from '../../actions/thunks';
import { Grid, Col, Row } from 'react-native-easy-grid';
import EngineStateList from '../../components/EngineStateList';
import EngineSettings from '../../components/EngineSettings';
import EngineDetails from '../../EngineDetails';

function GroundRobin(props) {
  const {
    resetDB,
    createAndSetEngine,
    completeRRCycle,
    engine,
  } = props;

  // todo do something with these anti-crash hard codes
  const roundCount = 0;

  function onStoreEnginePress() {
    createAndSetEngine();
    console.log('on store engine press');
  }
  return (
    <Container>
      <Grid style={{ borderWidth: 5 }}>
        <Row size={3} style={{ borderWidth: 3, borderColor: 'red' }}>
          <EngineSettings />
        </Row>
        <Row size={3} style={{ borderWidth: 3, borderColor: 'green' }}>
          <EngineStateList cycle={completeRRCycle} />
        </Row>
        <Row size={1} style={{ justifyContent: 'flex-end' }}>
          <Col size={3}>
            <EngineDetails settings={engine.settings} />
          </Col>
          <Col size={1}>
            <Button onPress={onStoreEnginePress}>
              <Text>Save Engine</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
      <Footer>
        <Button
          danger
          style={{ width: 'auto', marginLeft: 'auto' }}
          onPress={() => resetDB()}>
          <Text>Reset DB</Text>
        </Button>
      </Footer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    groundRobin: {
      activeParticipants,
      warmUp,
      coolDown,
      work,
      currentRound,
      estimatedTime,
      participants,
      roundCount,
      completeRRCycle,
      cycle,
      engine,
    },
    navigation: { map, elapsedSeconds },
  } = state;
  return {
    completeRRCycle,
    activeParticipants,
    warmUp,
    coolDown,
    currentRound,
    estimatedTime,
    participants,
    work,
    roundCount,
    map,
    elapsedSeconds,
    cycle,
    engine,
  };
};

const mapDispatchToProps = {
  resetDB,
  // setWork,
  createAndSetEngine,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroundRobin);
