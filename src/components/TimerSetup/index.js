import React, { useState } from 'react';
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

function TimerSetup(props) {
  const [showRoundTimeInput, setShowRoundTimeInput] = useState(false);
  const [showBreakTimeInput, setShowBreakTimeInput] = useState(false);
  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showRoundCountInput, setShowRoundCountInput] = useState(false);
  console.log('showRoundTImeINput ' + showRoundTimeInput);
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
        <Modal isVisible={showRoundTimeInput}>
          <TimeInput />
          <Button onPress={() => setShowRoundTimeInput(false)}>
            <Text>close modal</Text>
          </Button>
        </Modal>
      </Content>
      <Footer />
    </Container>
  );
}

export default TimerSetup;
