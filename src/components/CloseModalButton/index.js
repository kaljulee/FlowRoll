import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  closeButton: { width: 'auto', marginLeft: 'auto' },
});

function CloseModalButton(props) {
  const { onPress, label } = props;
  return (
    <Button style={styles.closeButton} onPress={onPress}>
      <Text>{label}</Text>
    </Button>
  );
}

CloseModalButton.defaultProps = { label: 'close' };

export default CloseModalButton;
