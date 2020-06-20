import React, { useState } from 'react';
import { connect } from 'react-redux';
import TimeInput from '../TimeInput';
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
import Modal from 'react-native-modal';
import NumberInput from '../NumberInput';
import { resetDB } from '../../actions';
import SetTimeModal from '../modals/SetTimeModal';

function TimerSetup(props) {
  const { roundTime, breakTime, resetDB } = props;
  console.group('in timersetup, roundtime from props');
  console.log(roundTime);
  console.groupEnd();
  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Button onPress={() => setShowParticipantInput(true)}>
          <Text>Set Players</Text>
        </Button>
        <Button onPress={() => setShowRoundTimeInput(true)}>
          <Text>Set Round Time</Text>
        </Button>
        <Button onPress={() => setShowBreakTimeInput(true)}>
          <Text>Set Break Time</Text>
        </Button>
        <Button onPress={() => setShowRoundCountInput(true)}>
          <Text>Set Round Count</Text>
        </Button>
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
