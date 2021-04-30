import React from 'react';
import { Button, Text } from 'native-base';

function SettingsButton(props) {
  const { onPress, label, info } = props;
  return (
    <Button style={{ flexDirection: 'row' }} onPress={onPress}>
      <Text style={{ marginRight: 'auto' }}>{label}</Text>
      <Text style={{ marginLeft: 'auto' }}>{info}</Text>
    </Button>
  );
}

export default SettingsButton;
