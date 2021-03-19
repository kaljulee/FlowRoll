import { View } from 'react-native';
import { Text } from 'native-base';
import { formatSecondsToDisplay } from '../../helpers/time';
import React from 'react';
import { Grid, Row, Col } from 'react-native-easy-grid';

export const TIE_TYPES = {
  TIME: 'TIME',
  LOCATION: 'LOCATION',
  ROUTE: 'ROUTE',
  NAV: 'NAV',
};

const tieStyling = {
  borderWidth: 1,
  borderColor: 'grey',
  width: 70,
  height: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 2,
};

export function LocationTie(props) {
  const { id, name, color, localTime, isSelected, runTime } = props;
  return (
    <View
      style={{
        ...tieStyling,
        backgroundColor: isSelected ? 'green' : color,
        height: 28,
        marginTop: 5,
        marginBottom: 5,
      }}>
      <Text>{formatSecondsToDisplay(runTime)}</Text>
    </View>
  );
}

export function TimeTie(props) {
  const { id, color, isSelected } = props;
  return (
    <View
      style={{
        ...tieStyling,
        backgroundColor: isSelected ? 'green' : color,
      }}
    />
  );
}

export function NavTie(props) {
  const { id, color, isSelected } = props;
  return (
    <View
      style={{
        ...tieStyling,
        margin: 0,
        marginVertical: 0,
        width: 340,
        height: 130,
        backgroundColor: color,
      }}>
      <Grid>
        <Col>
          <Text>activity label</Text>
        </Col>
        <Col>
          <Text>matchup data</Text>
        </Col>
      </Grid>
    </View>
  );
}
