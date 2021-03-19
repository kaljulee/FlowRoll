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
  },
  list: {
    width: '100%',
  },
});
// todo pretty crude subtitling with item.gear.  should be made into something more sane
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
            <Card style={{ ...styles.card, backgroundColor: item.color }}>
              <CardItem
                style={{
                  ...styles.item,
                  backgroundColor: item.color,
                  flexDirection: 'column',
                }}>
                <Text>{`${item.label}`}</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default SchedulingList;
