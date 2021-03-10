import React, { useState, useEffect } from 'react';
import { Text } from 'native-base';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { EMPTY_MAP } from '../../models/Location';

function TrainTracker(props) {
  const { map, location, localTime } = props;
  const [selectedID, setSelectedID] = useState(0);

  const railStyle = {
    position: 'absolute',
    height: '100%',
    width: 7,
    backgroundColor: 'black',
  };

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
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: checkIfSelected(item.id) ? 'green' : item.color,
          width: 70,
          height: 28,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 5,
        }}>
        <Text>{checkIfSelected(item.id) ? localTime : item.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    setSelectedID(location);
  }, [location]);

  return (
    <SafeAreaView style={{ height: '100%', width: '100%' }}>
      <View
        style={{
          ...railStyle,
          right: 15,
        }}
      />
      <View style={{ ...railStyle, right: 60 }} />
      <FlatList
        data={map.locations}
        renderItem={renderItem}
        keyExtractor={(i) => `${i.id}`}
        contentContainerStyle={listStyles.container}
        extraData={{ selectedID, localTime }}
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
