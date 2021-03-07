import { useElapsedSecondsUpdates } from '../../hooks';
import React, { useEffect } from 'react';
import { Body, Card, CardItem, Text } from 'native-base';
import { hourMinuteSecond, secondsToHMS } from '../../helpers/time';

function TotalTimeTracker(props) {
  const { departureTime, runTime, styles, elapsedSeconds } = props;

  useEffect(() => {
    if (elapsedSeconds > runTime) {
      // cancel();
    }
  }, [elapsedSeconds, runTime, departureTime]);
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
