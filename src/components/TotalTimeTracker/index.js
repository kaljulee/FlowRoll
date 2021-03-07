import { useElapsedSecondsUpdates } from '../../hooks';
import React, { useEffect } from 'react';
import { Body, Card, CardItem, Text } from 'native-base';
import { hourMinuteSecond, secondsToHMS } from '../../helpers/time';

function TotalTimeTracker(props) {
  const { startTime, runTime, styles } = props;

  const { elapsedSeconds, cancel } = useElapsedSecondsUpdates(
    startTime,
    // runTime,
  );
  useEffect(() => {
    // // console.log('start time');
    // // console.log(startTime)
    // console.log('totaltimetracker starttime');
    // console.log(startTime);
    if (elapsedSeconds > runTime) {
      cancel();
    }
  }, [elapsedSeconds, runTime, cancel, startTime]);
  return (
    <Card style={styles.totalTimeTracker}>
      <CardItem>
        <Body>
          <Text>{hourMinuteSecond(secondsToHMS(elapsedSeconds))} </Text>
        </Body>
      </CardItem>
    </Card>
  );
}

export default TotalTimeTracker;
