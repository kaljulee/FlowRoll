import React, { useState } from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Text, View } from 'native-base';
import SettingsButton from '../SettingsButton';
import ManageParticipantsModal from '../modals/ManageParticipantsModal';
import AddParticipantModal from '../modals/AddParticipantModal';
import DeleteParticipantModal from '../modals/DeleteParticipantModal';
import {
  resetDB,
  setPhaseTimes,
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
    work,
    warmUp,
    coolDown,
    setChamberCount,
    chamberCount,
    setPhaseTimes,
  } = props;

  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showDeleteParticipant, setShowDeleteParticipant] = useState(false);
  const [showChamberCountInput, setShowChamberCountInput] = useState(
    chamberCount,
  );

  return (
    <Grid>
      <Row size={1}>
        <SettingsButton
          label={'Set Players'}
          info={activeParticipants.length}
          onPress={() => setShowParticipantInput(true)}
        />
        {false && (
          <SettingsButton
            label={'Set Slots'}
            info={chamberCount}
            onPress={() => {
              setShowChamberCountInput(true);
            }}
          />
        )}
      </Row>
      <Row size={3}>
        <GroundTimeInput
          setPhaseTimes={setPhaseTimes}
          work={work}
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
      work,
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
    work,
    roundCount,
    map,
    elapsedSeconds,
    chamberCount,
  };
};

const mapDispatchToProps = {
  resetDB,
  setRoundTime,
  setPhaseTimes,
  createAndSetEngine,
  setChamberCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EngineSettings);
