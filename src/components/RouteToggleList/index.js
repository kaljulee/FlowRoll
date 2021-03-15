import React from 'react';
import { Text } from 'react-native';
import SchedulingList from '../SchedulingList';
function RouteList(props) {
  const { routes } = props;

  const onLongPress = () => {
    console.log('on long press');
  };

  const onPress = () => {
    console.log('onPress');
  };
  return (
    <SchedulingList data={routes} onPress={onPress} onLongPress={onLongPress} />
  );
}

export default RouteList;
