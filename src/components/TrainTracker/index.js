import React, { useState, useEffect } from 'react';
import { Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { EMPTY_MAP } from '../../models/Location';
import { Grid, Col } from 'react-native-easy-grid';
import { formatSecondsToDisplay } from '../../helpers/time';

////////////////////////////
// constants
const DISPLAY_TYPES = {
  TIME: 'TIME',
  LOCATION: 'LOCATION',
  ROUTE: 'ROUTE',
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

///////////////////////////
// supporting components
function RailCol() {
  return <Col size={1} style={{ backgroundColor: 'black' }} />;
}

function SpacerCol(props) {
  const adjust = props.adjust || 0;
  return <Col size={3 + adjust} />;
}

function TrainRails() {
  return (
    <Grid style={{ flexGrow: 1 }}>
      <SpacerCol />
      <RailCol />
      <SpacerCol adjust={1} />
      <RailCol />
      <SpacerCol />
    </Grid>
  );
}

function TrackDisplaySwitch(props) {
  const { trackDisplay, onSwitch } = props;
  const iconStyle = {
    color: 'grey',
    fontSize: 25,
    padding: 1,
  };
  const timeStyle = { ...iconStyle };
  const locationStyle = { ...iconStyle };
  if (trackDisplay === DISPLAY_TYPES.TIME) {
    timeStyle.color = 'white';
  }
  if (trackDisplay === DISPLAY_TYPES.LOCATION) {
    locationStyle.color = 'white';
  }
  return (
    <Button onPress={onSwitch} style={{ justifyContent: 'space-around' }}>
      <Icon style={timeStyle} name={'stopwatch'} />
      <Icon style={locationStyle} name={'image'} />
    </Button>
  );
}

function LocationTie(props) {
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

function TimeTie(props) {
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

//////////////////////////////
// export component
function TrainTracker(props) {
  const { map, location, localTime } = props;
  const [selectedID, setSelectedID] = useState(0);
  const [trackDisplay, setTrackDisplay] = useState(DISPLAY_TYPES.TIME);

  function toggleTrackDisplay() {
    if (trackDisplay === DISPLAY_TYPES.TIME) {
      setTrackDisplay(DISPLAY_TYPES.LOCATION);
    } else {
      setTrackDisplay(DISPLAY_TYPES.TIME);
    }
  }

  const listStyles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
    },
  });

  const checkIfSelected = (id) => {
    return id === selectedID;
  };

  const renderItem = ({ item }) => {
    if (trackDisplay === DISPLAY_TYPES.TIME) {
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
    }
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
  };

  useEffect(() => {
    setSelectedID(location);
  }, [location]);

  return (
    <SafeAreaView style={{ height: '100%', width: '100%' }}>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <TrainRails />
      </View>
      <FlatList
        data={map.locations}
        renderItem={renderItem}
        keyExtractor={(i) => `${i.id}`}
        contentContainerStyle={listStyles.container}
        extraData={{ selectedID, localTime, trackDisplay }}
      />
      <TrackDisplaySwitch
        trackDisplay={trackDisplay}
        onSwitch={toggleTrackDisplay}
      />
    </SafeAreaView>
  );
}

TrainTracker.defaultProps = {
  map: EMPTY_MAP,
  location: 0,
  localTime: 0,
};

export default TrainTracker;
