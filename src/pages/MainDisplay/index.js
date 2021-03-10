import React, { useState, useEffect } from 'react';
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
import { findMatchUpByID, STATUS } from '../../helpers/utils';
import ControlBar from '../../components/ControlBar';
import TotalTimeTracker from '../../components/TotalTimeTracker';
import { setDepartureTime } from '../../actions';
import { secondsToHMS, hourMinuteSecond } from '../../helpers/time';
import KeepAwake from 'react-native-keep-awake';
import moment from 'moment';

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

function CurrentMatchUp(props) {
  const { matchUp } = props;
  const text = matchUp ? matchUp.string : 'no matchup';
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

function TimerDisplay(props) {
  const { status, remainingSeconds } = props;
  const displayTime = hourMinuteSecond(secondsToHMS(remainingSeconds));
  const [backgroundColor, setBackgroundColor] = useState('white');

  // useEffect(() => {
  //   switch (status) {
  //     case STATUS.ROUND:
  //       setBackgroundColor('green');
  //       break;
  //     case STATUS.BREAK:
  //       setBackgroundColor('red');
  //       break;
  //     case STATUS.IDLE:
  //       setBackgroundColor('white');
  //       break;
  //     default:
  //       setBackgroundColor('white');
  //   }
  // }, [status]);

  return (
    <Card style={styles.timerDisplay}>
      <CardItem>
        <Body>
          <Text style={{ ...styles.timerDisplayText, backgroundColor }}>
            {displayTime}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
}

function RoundCounter(props) {
  const { roundCount, currentRound } = props;
  return (
    <Card style={styles.roundCounter}>
      <CardItem>
        <Body>
          <Text>{`${currentRound} / ${roundCount}`}</Text>
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
          <Text>{text}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

function MainDisplay(props) {
  const {
    departureTime,
    roundCount,
    schedule,
    currentRound,
    matchUps,
    onPressPause,
    onPressRestart,
    roundDuration,
    status,
    // endTimeStamp,
    // elapsedSeconds,
    // remainingSeconds,
  } = props;

  function onPressPlay() {
    // todo play disabled until departureTime data chain is in place
    console.log('play does nothing');
  }

  // !! danger !!
  // current round count starts at 1, schedule starts at 0
  const currentMatchUp = findMatchUpByID(matchUps, schedule[currentRound - 1]);
  const nextMatchUp =
    currentRound + 1 === roundCount
      ? undefined
      : findMatchUpByID(matchUps, schedule[currentRound]);

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <CurrentMatchUp matchUp={currentMatchUp} />
        <TimerDisplay />
        <RoundCounter currentRound={currentRound} roundCount={roundCount} />
        <TotalTimeTracker
          styles={styles}
          departureTime={departureTime}
          runTime={4}
        />
        <NextMatchUp matchUp={nextMatchUp} />
        <KeepAwake />
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
    groundRobin: {
      participants,
      warmUp,
      roundTime,
      coolDown,
      currentRound,
      roundCount,
      schedule,
      matchUps,
      timerDuration,
    },
    navigation: { departureTime },
  } = state;

  return {
    departureTime,
    schedule,
    participants,
    currentRound,
    roundCount,
    matchUps,
    timerDuration,
    warmUp,
    coolDown,
    roundTime,
  };
};

const mapDispatchToProps = {
  setDepartureTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainDisplay);
