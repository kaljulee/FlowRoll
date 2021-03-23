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

export const getTieDimensions = (type) => {
  switch (type) {
    case TIE_TYPES.NAV:
      return { height: 130, marginTop: 8, marginBottom: 8 };
    case TIE_TYPES.TIME:
      return { height: 8, marginTop: 2, marginBottom: 2 };
    case TIE_TYPES.LOCATION:
      return { height: 28, marginTop: 5, marginBottom: 5 };
    case TIE_TYPES.ROUTE:
      return { height: 28, marginTop: 5, marginBottom: 5 };
    default:
      return { height: 8, marginTop: 2, marginBottom: 2 };
  }
};

export const getTotalTieHeight = (type) => {
  const dim = getTieDimensions(type);
  return dim.height + dim.marginTop + dim.marginBottom;
};

const tieStyling = {
  borderWidth: 1,
  borderColor: 'grey',
  width: 70,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...getTieDimensions(),
};

export function LocationTie(props) {
  const { id, name, color, localTime, isSelected, runTime } = props;
  return (
    <View
      style={{
        ...tieStyling,
        backgroundColor: isSelected ? 'green' : color,
        ...getTieDimensions(TIE_TYPES.LOCATION),
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
        ...getTieDimensions(TIE_TYPES.TIME),
        backgroundColor: isSelected ? 'green' : color,
      }}
    />
  );
}

// todo uses hard coded floorState[0]
export function NavTie(props) {
  const { id, color, isSelected, name, phase, floorState, phaseColor } = props;

  const bgColor = isSelected ? 'yellow' : color || phaseColor;
  return (
    <View
      style={{
        ...tieStyling,
        width: 340,
        ...getTieDimensions(TIE_TYPES.NAV),
        backgroundColor: bgColor,
      }}>
      <Grid>
        <Col style={{ backgroundColor: phaseColor }}>
          <Text>{`${name}`}</Text>
        </Col>
        <Col>
          <Text>{`${floorState ? floorState[0].string : ''}`}</Text>
        </Col>
      </Grid>
    </View>
  );
}

export const renderTie = ({
  item,
  trackDisplay,
  checkIfSelected,
  localTime,
}) => {
  switch (trackDisplay) {
    case TIE_TYPES.TIME:
      const tracks = [];
      for (let i = 0; i < item.runTime; i += 300) {
        tracks.push(
          <TimeTie
            key={`${item.id}_${i}`}
            isSelected={checkIfSelected(item.id)}
            id={item.id}
            name={item.name}
            color={item.color}
          />,
        );
      }
      return <View>{tracks}</View>;
    case TIE_TYPES.LOCATION:
      return (
        <LocationTie
          key={`${item.id}`}
          localTime={localTime}
          isSelected={checkIfSelected(item.id)}
          id={item.id}
          name={item.name}
          color={item.color}
          runTime={item.runTime}
        />
      );
    case TIE_TYPES.NAV:
      return (
        <NavTie
          name={item.name}
          floorState={item.floorState}
          phase={item.phase}
          phaseColor={item.phaseColor}
          id={item.id}
          color={item.color}
          isSelected={checkIfSelected(item.id)}
        />
      );

    //default is location
    default:
      return (
        <LocationTie
          key={`${item.id}`}
          localTime={localTime}
          isSelected={checkIfSelected(item.id)}
          id={item.id}
          name={item.name}
          color={item.color}
          runTime={item.runTime}
        />
      );
  }
};
