import React, { useState } from 'react';
import { connect } from 'react-redux';
import TimeInput from '../../components/TimeInput';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import { resetDB } from '../../actions';
import SetTimeModal from '../../components/modals/SetTimeModal';
import SettingsButton from '../../components/SettingsButton';
import SetRoundCountModal from '../../components/modals/SetRoundCountModal';
import ManageParticipantsModal from '../../components/modals/ManageParticipantsModal';
import ParticipantManager from '../../components/ParticipantManager';

function TimerSetup(props) {
  const {
    roundDuration,
    breakDuration,
    resetDB,
    roundCount,
    participants,
    changeTab,
  } = props;
  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);

  function onStartPress() {
    changeTab(1);
  }

  return (
    <Container>
      <Content>
        <SettingsButton
          label={'Set Players'}
          onPress={() => setShowParticipantInput(true)}
        />
        <SettingsButton
          onPress={() => setShowRoundTimeInput(true)}
          label={'Set Round Time'}
        />
        <SettingsButton
          onPress={() => setShowBreakTimeInput(true)}
          label={'Set Break Time'}
        />
        <SettingsButton
          onPress={() => setShowRoundCountInput(true)}
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
      breakDuration,
      currentRound,
      estimatedTime,
      participants,
      roundCount,
      roundDuration,
    },
  } = state;
  return {
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerSetup);
