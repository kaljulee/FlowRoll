import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hourMinuteSecond, ZERO_TIME } from '../../helpers/time';
import { Container, Content, Footer, Button, Text } from 'native-base';
import {
  resetDB,
  setBreakTime,
  setRoundTime,
} from '../../actions';
import { createAndSetEngine } from '../../actions/thunks';
import { Grid, Col } from 'react-native-easy-grid';
import SetTimeModal from '../../components/modals/SetTimeModal';
import SettingsButton from '../../components/SettingsButton';
import SetRoundCountModal from '../../components/modals/SetRoundCountModal';
import ManageParticipantsModal from '../../components/modals/ManageParticipantsModal';
import AddParticipantModal from '../../components/modals/AddParticipantModal';
import DeleteParticipantModal from '../../components/modals/DeleteParticipantModal';
import TrainTracker from '../../components/TrainTracker';

function TimerSetup(props) {
  const {
    resetDB,
    participants,
    changeTab,
    activeParticipants,
    location,
    map,
    localTime,
      createAndSetEngine,
  } = props;

  // todo do something with these anti-crash hard codes
  const roundCount = 0;
  const roundDuration = ZERO_TIME;
  const breakDuration = ZERO_TIME;

  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showDeleteParticipant, setShowDeleteParticipant] = useState(false);

  function onSavePress() {
    console.log('put some map making logic here');
    // changeTab(1);
  }

  function onStoreEnginePress() {
    createAndSetEngine();
    console.log('on store engine press');
  }

  return (
    <Container>
      <Grid style={{ borderWidth: 5 }}>
        <Col size={5}>
          <SettingsButton
            label={'Set Players'}
            info={activeParticipants.length}
            onPress={() => setShowParticipantInput(true)}
          />
          <SettingsButton
            onPress={() => setShowRoundTimeInput(true)}
            info={hourMinuteSecond(roundDuration)}
            label={'Set Round Time'}
          />
          <SettingsButton
            onPress={() => setShowBreakTimeInput(true)}
            label={'Set Break Time'}
            info={hourMinuteSecond(breakDuration)}
          />
          <SettingsButton
            onPress={() => setShowRoundCountInput(true)}
            info={roundCount}
            label={'Set Round Count'}
          />
          <Button onPress={onStoreEnginePress}>
            <Text>create engine</Text>
          </Button>
        </Col>
        <Col size={1} style={{ borderWidth: 5 }}>
          <TrainTracker location={location} map={map} localTime={localTime} />
        </Col>
        <SetTimeModal
          label={'round length'}
          isVisible={showRoundTimeInput}
          value={roundDuration}
          onSelectedChange={setRoundTime}
          onClosePress={() => setShowRoundTimeInput(false)}
        />
        <SetTimeModal
          label={'break length'}
          isVisible={showBreakTimeInput}
          value={breakDuration}
          onSelectedChange={setBreakTime}
          onClosePress={() => setShowBreakTimeInput(false)}
        />
        <SetRoundCountModal
          isVisible={showRoundCountInput}
          value={roundCount}
          onClosePress={() => setShowRoundCountInput(false)}
        />
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
      breakDuration,
      currentRound,
      estimatedTime,
      participants,
      roundCount,
      roundDuration,
    },
    navigation: { map, elapsedSeconds },
  } = state;
  return {
    activeParticipants,
    breakDuration,
    currentRound,
    estimatedTime,
    participants,
    roundDuration,
    roundCount,
    map,
    elapsedSeconds,
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
)(TimerSetup);
