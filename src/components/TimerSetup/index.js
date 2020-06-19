import React from 'react';
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

function TimerSetup(props) {
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
        <Button onPress={() => console.log('fuck')}>
          <Text>Set Players</Text>
        </Button>
        <Button>
          <Text>Set Round Time</Text>
        </Button>
        <Button>
          <Text>Set Break Time</Text>
        </Button>
        <Button>
          <Text>Set Round Count</Text>
        </Button>
        <Button><Text>Start</Text></Button>
      </Content>
      <Footer />
    </Container>
  );
}

export default TimerSetup;
