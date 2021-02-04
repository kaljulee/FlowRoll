import React from 'react';
import { Card, CardItem } from 'native-base';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

function EmptyList(props) {
  return (
    <Card>
      <CardItem>
        <Text>nothing here!</Text>
      </CardItem>
    </Card>
  );
}

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

function SchedulingList(props) {
  const { data, onLongPress, onPress } = props;
  return (
    <FlatList
      style={styles.list}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => EmptyList()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => onPress(item.id)}
            onLongPress={() => onLongPress(item.id)}>
            <Card style={styles.card}>
              <CardItem style={styles.item}>
                <Text>{`${item.name}`}</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default SchedulingList;
