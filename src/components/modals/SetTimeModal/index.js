import Modal from 'react-native-modal';
import TimeInput from '../../TimeInput';
import { Button, Content, Text } from 'native-base';
import React from 'react';

function SetTimeModal(props) {
  const { isVisible, value, onClosePress, label } = props;
  return (
    <Modal isVisible={isVisible}>
      <TimeInput value={value} label={label} />
      <Button
        style={{ width: 'auto', marginLeft: 'auto' }}
        onPress={onClosePress}>
        <Text>close</Text>
      </Button>
    </Modal>
  );
}

export default SetTimeModal;
