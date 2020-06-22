import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text, Card, CardItem, Body } from 'native-base';
import { hourMinuteSecond } from '../../helpers/time';

const cardStyle = {
  width: '80%',
  alignSelf: 'center',
};

const styles = StyleSheet.create({
  currentMatchup: {
    ...cardStyle,
    flex: 2,
  },
  roundTime: {
    ...cardStyle,
    flex: 5,
  },
  roundCounter: {
    ...cardStyle,
  },
  totalTimeTracker: {
    ...cardStyle,
  },
  container: {
    height: '100%',
  },
  content: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
});

function CurrentMatchup(props) {
  return (
    <Card style={styles.currentMatchup}>
      <CardItem>
        <Body>
          <Text>{props.text || 'no matchup'}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

function RoundTime(props) {
  const { time } = props;
  const timeString = time ? `${time.m}:${time.s}` : 'no time in round time';
  return (
    <Card style={styles.roundTime}>
      <CardItem>
        <Body>
          <Text>{timeString}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

function RoundCounter(props) {
  const { current, total } = props;
  return (
    <Card style={styles.roundCounter}>
      <CardItem>
        <Body>
          <Text>{`${current} / ${total}`}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

function TotalTimeTracker(props) {
  return (
    <Card style={styles.totalTimeTracker}>
      <CardItem>
        <Body>
          <Text>total time tracker, not sure how to break this up yet</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

function NextMatchup(props) {
  return <CurrentMatchup text={'this is NextMatchup'} />;
}

function MainDisplay(props) {
  return (
    <Content contentContainerStyle={styles.content}>
      <CurrentMatchup />
      <RoundTime />
      <RoundCounter />
      <TotalTimeTracker />
      <NextMatchup />
    </Content>
  );
}

export default MainDisplay;
