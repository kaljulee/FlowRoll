import React from 'react';
import { Text, List, ListItem } from 'native-base';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';

function TrainTracker(props) {
  const { route } = props;

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

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: item.color,
          width: 70,
          height: 28,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 5,
        }}>
        <Text>{item.name}</Text>
      </View>
    );
  };

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
        data={route}
        renderItem={renderItem}
        keyExtractor={(i) => `${i.id}`}
        contentContainerStyle={listStyles.container}
      />
    </SafeAreaView>
  );
}

export default TrainTracker;
