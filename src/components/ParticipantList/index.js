import React from 'react';
import { Card, CardItem } from 'native-base';
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: '90%',
  },
  emptyListText: {
    color: 'grey',
  },
  item: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
  },
  list: {
    width: '100%',
  },
});

function ParticipantList(props) {
  const { participants, onParticipantPress } = props;

  const EmptyList = () => (
    <Card>
      <CardItem>
        <Text style={styles.emptyListText}> nothing here! </Text>
      </CardItem>
    </Card>
  );

  return (
    <FlatList
      style={styles.list}
      data={participants}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => EmptyList()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => onParticipantPress(item.id)}>
            <Card style={styles.card}>
              <CardItem style={styles.item}>
                <Text>{item.name}</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default ParticipantList;
