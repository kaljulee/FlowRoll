import React from 'react';
import { Container, Content, Text } from 'native-base';

function Timer(props) {
  return (
    <Container>
      <Content style={{flexDirection: 'column'}}>
          <Text>timer component!</Text>
          <Text>second text thing, should be col</Text>
      </Content>
    </Container>
  );
}

export default Timer;
