import React from 'react';
import { Text } from 'react-native';
import SchedulingList from '../SchedulingList';
function LegList(props) {
  const { legs } = props;

  const onLongPress = () => {
    console.log('on long press');
  };

  const onPress = () => {
    console.log('onPress');
  };

  return (
    <SchedulingList data={legs} onPress={onPress} onLongPress={onLongPress} />
  );
}

export default LegList;
