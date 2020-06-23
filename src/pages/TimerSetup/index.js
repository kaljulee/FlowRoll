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
  const { roundTime, breakTime, resetDB, roundCount, participants } = props;
  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);
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
        <Button>
          <Text>Start</Text>
        </Button>
        <SetTimeModal
          label={'round length'}
          isVisible={showRoundTimeInput}
          value={roundTime}
          onClosePress={() => setShowRoundTimeInput(false)}
        />
        <SetTimeModal
          label={'break length'}
          isVisible={showBreakTimeInput}
          value={breakTime}
          onClosePress={() => setShowBreakTimeInput(false)}
        />
        <SetRoundCountModal
          isVisible={showRoundCountInput}
          value={roundCount}
          onClosePress={() => setShowRoundCountInput(false)}
        />
        <ManageParticipantsModal
          isVisible={showParticipantInput}
          onClosePress={() => setShowParticipantInput(false)}
        />
        <ParticipantManager participants={participants}/>
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
      breakTime,
      currentRound,
      estimatedTime,
      participants,
      roundCount,
      roundTime,
    },
  } = state;
  return {
    breakTime,
    currentRound,
    estimatedTime,
    participants,
    roundTime,
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
