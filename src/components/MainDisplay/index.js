import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text, Card, CardItem, Body } from 'native-base';
import { hourMinuteSecond } from '../../helpers/time';

const styles = StyleSheet.create({
  currentMatchup: {
    width: '80%',
    flex: 2,
    alignSelf: 'center',
  },
  container: {
    height: '100%',
    // borderColor: 'blue',
    // borderWidth: 5,
  },
  content: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 5,
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
  return <Text>{timeString}</Text>;
}

function RoundCounter(props) {
  const { current, total } = props;
  return <Text>{`${current} / ${total}`}</Text>;
}

function TotalTimeTracker(props) {
  return (
    <View>
      <Text>total time tracker, not sure how to break this up yet</Text>
    </View>
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
