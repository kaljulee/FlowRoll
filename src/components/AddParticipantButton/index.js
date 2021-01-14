import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react';

const styles = StyleSheet.create({
  addButton: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function AddParticipantButton(props) {
  const { onPress } = props;
  return (
    <Button onPress={onPress} style={styles.addButton}>
      <Icon
        style={{ color: 'white', fontSize: 25, padding: 1 }}
        name={'add-user'}
      />
    </Button>
  );
}

export default AddParticipantButton;
