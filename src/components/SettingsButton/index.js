import React from 'react';
import { Button, Text } from 'native-base';

function SettingsButton(props) {
  const { onPress, label } = props;
  return (
    <Button onPress={onPress}>
      <Text>{label}</Text>
    </Button>
  );
}

export default SettingsButton;
