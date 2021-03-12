import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hourMinuteSecond, ZERO_TIME } from '../../helpers/time';
import { Container, Content, Footer, Button, Text } from 'native-base';
import { resetDB, setBreakTime, setRoundTime } from '../../actions';
import { createAndSetEngine } from '../../actions/thunks';
import { Grid, Col, Row } from 'react-native-easy-grid';
import SetTimeModal from '../../components/modals/SetTimeModal';
import SettingsButton from '../../components/SettingsButton';
import SetRoundCountModal from '../../components/modals/SetRoundCountModal';
import ManageParticipantsModal from '../../components/modals/ManageParticipantsModal';
import AddParticipantModal from '../../components/modals/AddParticipantModal';
import DeleteParticipantModal from '../../components/modals/DeleteParticipantModal';
import TrainTracker from '../../components/TrainTracker';
import EngineStateList from '../../components/EngineStateList';
import EngineSettings from '../../components/EngineSettings';

function GroundRobin(props) {
  const {
    resetDB,
    participants,
    changeTab,
    activeParticipants,
    location,
    map,
    localTime,
    createAndSetEngine,
    roundTime,
    warmUp,
    coolDown,
    completeRRCycle,
    schedule,
  } = props;

  // todo do something with these anti-crash hard codes
  const roundCount = 0;

  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showDeleteParticipant, setShowDeleteParticipant] = useState(false);

  function onStoreEnginePress() {
    createAndSetEngine();
    console.log('on store engine press');
  }
  // todo needs to be annotated map to display
  return (
    <Container>
      <Grid style={{ borderWidth: 5 }}>
        <Row style={{ borderWidth: 3, borderColor: 'red' }}>
          <EngineSettings />
        </Row>
        <Row style={{ borderWidth: 3, borderColor: 'green' }}>
          <EngineStateList cycle={completeRRCycle} />
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
      roundTime,
      currentRound,
      estimatedTime,
      participants,
      roundCount,
      completeRRCycle,
      schedule,
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
    roundTime,
    roundCount,
    map,
    elapsedSeconds,
    schedule,
  };
};

const mapDispatchToProps = {
  resetDB,
  setRoundTime,
  setBreakTime,
  createAndSetEngine,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroundRobin);
