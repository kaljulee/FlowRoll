import React, { useState } from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Text, View } from 'native-base';
import SettingsButton from '../SettingsButton';
import ManageParticipantsModal from '../modals/ManageParticipantsModal';
import AddParticipantModal from '../modals/AddParticipantModal';
import DeleteParticipantModal from '../modals/DeleteParticipantModal';
import {
  resetDB,
  setBreakTime,
  setChamberCount,
  setRoundTime,
} from '../../actions';
import { createAndSetEngine } from '../../actions/thunks';
import { connect } from 'react-redux';
import GroundTimeInput from '../GroundTimeInput';

function EngineSettings(props) {
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
    setChamberCount,
    chamberCount,
  } = props;

  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showDeleteParticipant, setShowDeleteParticipant] = useState(false);
  const [showChamberCountInput, setShowChamberCountInput] = useState(
    chamberCount,
  );

  return (
    <Grid>
      <Row>
        <SettingsButton
          label={'Set Players'}
          info={activeParticipants.length}
          onPress={() => setShowParticipantInput(true)}
        />
        <SettingsButton
          label={'Set Slots'}
          info={chamberCount}
          onPress={() => {
            setShowChamberCountInput(true);
          }}
        />
      </Row>
      <Row>
        <GroundTimeInput
          roundTime={roundTime}
          warmUp={warmUp}
          coolDown={coolDown}
        />
      </Row>
      <ManageParticipantsModal
        onLongPressParticipant={setShowDeleteParticipant}
        participants={participants}
        isVisible={showParticipantInput}
        onClosePress={() => setShowParticipantInput(false)}
        onAddParticipantPress={() => {
          console.log('partic? ' + !showAddParticipant);
          setShowAddParticipant(true);
        }}
      />
      <AddParticipantModal
        isVisible={showAddParticipant}
        closeModal={() => setShowAddParticipant(false)}
      />
      <DeleteParticipantModal
        setShowDeleteParticipant={setShowDeleteParticipant}
        deletableParticipant={showDeleteParticipant}
        closeModal={() => setShowDeleteParticipant(null)}
      />
    </Grid>
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
      chamberCount,
    },
    navigation: { map, elapsedSeconds },
  } = state;
  return {
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
    chamberCount,
  };
};

const mapDispatchToProps = {
  resetDB,
  setRoundTime,
  setBreakTime,
  createAndSetEngine,
  setChamberCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EngineSettings);
