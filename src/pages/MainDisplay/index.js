import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Text, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { findMatchUpByID } from '../../helpers/utils';

const cardStyle = {
  width: '90%',
  alignSelf: 'center',
};

const styles = StyleSheet.create({
  currentMatchup: {
    ...cardStyle,
    flex: 3,
  },
  roundTime: {
    ...cardStyle,
    flex: 6,
  },
  roundCounter: {
    ...cardStyle,
    flex: 2,
  },
  totalTimeTracker: {
    ...cardStyle,
    flex: 2,
  },
  nextMatchup: {
    ...cardStyle,
    flex: 2,
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
  const { matchUp } = props;
  const text = matchUp ? matchUp.toString() : 'no matchup';
  return (
    <Card style={styles.currentMatchup}>
      <CardItem>
        <Body>
          <Text>{text}</Text>
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
  const { matchUp } = props;
  const text = matchUp ? matchUp.toString() : 'last round';
  return (
    <Card style={styles.nextMatchup}>
      <CardItem>
        <Body>
          <Text>{text}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

function MainDisplay(props) {
  const { roundCount, schedule, currentRound, matchUps } = props;
  const currentMatchUp = findMatchUpByID(matchUps, schedule[currentRound]);
  const nextMatchUp =
    currentRound + 1 === roundCount
      ? undefined
      : findMatchUpByID(matchUps, schedule[currentRound + 1]);
  return (
    <Content contentContainerStyle={styles.content}>
      <CurrentMatchup matchUp={currentMatchUp} />
      <RoundTime />
      <RoundCounter current={currentRound} total={roundCount} />
      <TotalTimeTracker />
      <NextMatchup matchUp={nextMatchUp} />
    </Content>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: {
      participants,
      roundTime,
      breakTime,
      currentRound,
      roundCount,
      schedule,
      matchUps,
    },
  } = state;
  return {
    schedule,
    participants,
    roundTime,
    breakTime,
    currentRound,
    roundCount,
    matchUps,
  };
};

export default connect(
  mapStateToProps,
  null,
)(MainDisplay);
