import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { hourMinuteSecond } from '../../helpers/time';
import { Container, Content, Footer, Button, Text } from 'native-base';
import { startTimerRun, resetDB } from '../../actions';
import SetTimeModal from '../../components/modals/SetTimeModal';
import SettingsButton from '../../components/SettingsButton';
import SetRoundCountModal from '../../components/modals/SetRoundCountModal';
import ManageParticipantsModal from '../../components/modals/ManageParticipantsModal';

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
  } = props;
  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);

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
          onClosePress={() => setShowRoundTimeInput(false)}
        />
        <SetTimeModal
          label={'break length'}
          isVisible={showBreakTimeInput}
          value={breakDuration}
          onClosePress={() => setShowBreakTimeInput(false)}
        />
        <SetRoundCountModal
          isVisible={showRoundCountInput}
          value={roundCount}
          onClosePress={() => setShowRoundCountInput(false)}
        />
        <ManageParticipantsModal
          participants={participants}
          isVisible={showParticipantInput}
          onClosePress={() => setShowParticipantInput(false)}
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
  startTimerRun,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerSetup);
