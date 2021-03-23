import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { EMPTY_MAP } from '../../models/Location';
import { Grid, Col } from 'react-native-easy-grid';
import { TIE_TYPES, renderTie, getTotalTieHeight } from './tieTypes';
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

function cleanEnforcedPosition(position, locations) {
  const index = _.findIndex(locations, { id: position });
  if (index === -1) {
    return undefined;
  }
  return index;
}

//////////////////////////////
// export component
function TrainTracker(props) {
  const { map, location, localTime, defaultTieType } = props;
  const [selectedID, setSelectedID] = useState(0);
  const [enforcedPosition, setEnforcedPosition] = useState(
    cleanEnforcedPosition(props.enforcedPosition, map.locations),
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

  // sets enforced position from props
  useEffect(() => {
    setEnforcedPosition(
      cleanEnforcedPosition(props.enforcedPosition, map.locations),
    );
  }, [props.enforcedPosition, map]);
  // set enforcedPosition based on location changes
  useEffect(() => {
    setSelectedID(location);
    setEnforcedPosition(cleanEnforcedPosition(location, map.locations));
  }, [location, map]);

  // scroll flatlist to enforced position
  useEffect(() => {
    if (refContainer && refContainer.current && !isNaN(enforcedPosition)) {
      refContainer.current.scrollToIndex({
        animated: true,
        index: enforcedPosition,
        viewPosition: 0,
      });
    }
  }, [enforcedPosition]);

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
        initialScrollIndex={enforcedPosition}
        ref={refContainer}
        data={map.locations}
        renderItem={({ item }) =>
          renderTie({ item, trackDisplay, localTime, checkIfSelected })
        }
        getItemLayout={(data, index) => {
          return {
            length: getTotalTieHeight(trackDisplay),
            offset: getTotalTieHeight(trackDisplay) * index,
            index,
          };
        }}
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
