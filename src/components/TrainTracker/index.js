import React, { useState, useEffect, useRef } from 'react';
import { Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { EMPTY_MAP } from '../../models/Location';
import { Grid, Col } from 'react-native-easy-grid';
import { LocationTie, TimeTie, NavTie, TIE_TYPES } from './tieTypes';
////////////////////////////
// constants

///////////////////////////
// supporting components
function RailCol() {
  return <Col size={1} style={{ backgroundColor: 'black' }} />;
}

function SpacerCol(props) {
  const adjust = props.adjust || 0;
  return <Col size={3 + adjust} />;
}

export function TrainRails() {
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
  if (trackDisplay === TIE_TYPES.TIME) {
    timeStyle.color = 'white';
  }
  if (trackDisplay === TIE_TYPES.LOCATION) {
    locationStyle.color = 'white';
  }
  return (
    <Button onPress={onSwitch} style={{ justifyContent: 'space-around' }}>
      <Icon style={timeStyle} name={'stopwatch'} />
      <Icon style={locationStyle} name={'image'} />
    </Button>
  );
}

//////////////////////////////
// export component
function TrainTracker(props) {
  const { map, location, localTime, defaultTieType } = props;
  const [selectedID, setSelectedID] = useState(0);
  const [enforcedPosition, setEnforcedPosition] = useState(
    props.enforcedPosition,
  );
  const [trackDisplay, setTrackDisplay] = useState(
    defaultTieType || TIE_TYPES.TIME,
  );
  const refContainer = useRef(null);

  function toggleTrackDisplay() {
    if (trackDisplay === TIE_TYPES.TIME) {
      setTrackDisplay(TIE_TYPES.LOCATION);
    } else {
      setTrackDisplay(TIE_TYPES.TIME);
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

  useEffect(() => {
    if (refContainer && refContainer.current && !isNaN(enforcedPosition)) {
      refContainer.current.scrollToIndex({
        animated: true,
        index: enforcedPosition,
        viewPosition: 0,
      });
    }
  }, [enforcedPosition]);
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
        onScrollToIndexFailed={(arg1, arg2) => {
          console.log('scroll index faild');
          console.log(arg1);
          console.log(arg2);
        }}
        initialScrollIndex={0}
        ref={refContainer}
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
