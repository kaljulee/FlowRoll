import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import React from 'react';

function ActivityLabel(props) {
  const { label, color } = props;
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        backgroundColor: color,
        height: '100%',
        width: '100%',
      }}>
      <Text style={{ textAlign: 'center' }}>{label}</Text>
    </TouchableOpacity>
  );
}

export default ActivityLabel;
