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
import NumberInput from '../NumberInput';

function TimerSetup(props) {
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
        <Modal isVisible={showRoundTimeInput}>
          <TimeInput label={'round length'} />
          <Button style={{width: 'auto', marginLeft: 'auto'}} onPress={() => setShowRoundTimeInput(false)}>
            <Text>close</Text>
          </Button>
        </Modal>
      </Content>
      <Footer />
    </Container>
  );
}

export default TimerSetup;
