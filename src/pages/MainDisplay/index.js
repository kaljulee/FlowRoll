import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Container,
  Footer,
} from 'native-base';
import { connect } from 'react-redux';
import { findMatchUpByID } from '../../helpers/utils';
import ControlBar from '../../components/ControlBar';
import { useCountDown, useElapsedTime } from '../../helpers/hooks';
import { startTimerRun } from '../../actions';

const cardStyle = {
  width: '90%',
  alignSelf: 'center',
};

const cardItemStyle = {
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 25,
};

const styles = StyleSheet.create({
  currentMatchup: {
    ...cardStyle,
    flex: 3,
  },
  timerDisplay: {
    ...cardStyle,
    flex: 6,
  },
  timerDisplayText: {
    fontSize: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
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

function MainDisplayText(props) {
  return (
    <Text style={{ ...cardItemStyle, ...props.style }}>{props.children}</Text>
  );
}

function CurrentMatchUp(props) {
  const { matchUp } = props;
  const text = matchUp ? matchUp.string : 'no matchup';
  return (
    <Card style={styles.currentMatchup}>
      <CardItem>
        <Body>
          <MainDisplayText>{text}</MainDisplayText>
        </Body>
      </CardItem>
    </Card>
  );
}

function TimerDisplay(props) {
  const { startTimeStamp, timeDuration } = props;
  const { elapsedTime, activeTimer, clearTimer } = useElapsedTime(
    startTimeStamp,
  );

  const displayTime = useCountDown(elapsedTime, startTimeStamp, timeDuration);

  return (
    <Card style={styles.timerDisplay}>
      <CardItem>
        <Body>
          <MainDisplayText style={styles.timerDisplayText}>
            {displayTime}
          </MainDisplayText>
        </Body>
      </CardItem>
    </Card>
  );
}

function RoundCounter(props) {
  const { total, currentRound } = props;
  return (
    <Card style={styles.roundCounter}>
      <CardItem>
        <Body>
          <MainDisplayText>{`${currentRound} / ${total}`}</MainDisplayText>
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
          <MainDisplayText>
            total time tracker, not sure how to break this up yet
          </MainDisplayText>
        </Body>
      </CardItem>
    </Card>
  );
}

function NextMatchUp(props) {
  const { matchUp } = props;
  const text = matchUp ? matchUp.string : 'last round';
  return (
    <Card style={styles.nextMatchup}>
      <CardItem>
        <Body>
          <MainDisplayText>{text}</MainDisplayText>
        </Body>
      </CardItem>
    </Card>
  );
}

function MainDisplay(props) {
  const {
    startTimeStamp,
    roundCount,
    schedule,
    currentRound,
    matchUps,
    onPressPause,
    onPressRestart,
    roundDuration,
      startTimerRun,
  } = props;

  function onPressPlay() {
    startTimerRun();
  }

  const currentMatchUp = findMatchUpByID(matchUps, schedule[currentRound]);
  const nextMatchUp =
    currentRound + 1 === roundCount
      ? undefined
      : findMatchUpByID(matchUps, schedule[currentRound + 1]);
  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <CurrentMatchUp matchUp={currentMatchUp} />
        <TimerDisplay
          startTimeStamp={startTimeStamp}
          timeDuration={roundDuration}
        />
        <RoundCounter currentRound={currentRound} total={roundCount} />
        <TotalTimeTracker />
        <NextMatchUp matchUp={nextMatchUp} />
      </Content>
      <Footer>
        <ControlBar
          onPressPlay={onPressPlay}
          onPressPause={onPressPause}
          onPressRestart={onPressRestart}
        />
      </Footer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: {
      participants,
      roundDuration,
      breakDuration,
      currentRound,
      roundCount,
      schedule,
      matchUps,
      startTimeStamp,
    },
  } = state;
  return {
    startTimeStamp,
    schedule,
    participants,
    roundDuration,
    breakDuration,
    currentRound,
    roundCount,
    matchUps,
  };
};

const mapDispatchToProps = {
  startTimerRun,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainDisplay);
