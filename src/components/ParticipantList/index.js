import React from 'react';
import { Card, CardItem } from 'native-base';
import { Text, FlatList, StyleSheet } from 'react-native';

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
  const { participants } = props;

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
          <Card style={styles.card}>
            <CardItem style={styles.item}>
              <Text>{item.name}</Text>
            </CardItem>
          </Card>
        );
      }}
    />
  );
}

export default ParticipantList;
