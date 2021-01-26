import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hourMinuteSecond } from '../../helpers/time';
import { Container, Content, Footer, Button, Text } from 'native-base';
import {
  startTimerRun,
  resetDB,
  setBreakTime,
  setRoundTime,
} from '../../actions';
import SetTimeModal from '../../components/modals/SetTimeModal';
import SettingsButton from '../../components/SettingsButton';
import SetRoundCountModal from '../../components/modals/SetRoundCountModal';
import ManageParticipantsModal from '../../components/modals/ManageParticipantsModal';
import AddParticipantModal from '../../components/modals/AddParticipantModal';
import DeleteParticipantModal from '../../components/modals/DeleteParticipantModal';

function TimerSetup(props) {
  const {
    roundDuration,
    breakDuration,
    resetDB,
    roundCount,
    participants,
    changeTab,
    activeParticipants,
    startTimerRun,
    setRoundTime,
    setBreakTime,
  } = props;
  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showDeleteParticipant, setShowDeleteParticipant] = useState(false);

  function onStartPress() {
    startTimerRun();
    changeTab(1);
  }

  return (
    <Container>
      <Content>
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
        <Button onPress={onStartPress}>
          <Text>Start</Text>
        </Button>
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
      </Content>
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
    basicReducer: {
      activeParticipants,
      breakDuration,
      currentRound,
      estimatedTime,
      participants,
      roundCount,
      roundDuration,
    },
  } = state;
  return {
    activeParticipants,
    breakDuration,
    currentRound,
    estimatedTime,
    participants,
    roundDuration,
    roundCount,
  };
};

const mapDispatchToProps = {
  resetDB,
  setRoundTime,
  setBreakTime,
  startTimerRun,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerSetup);
