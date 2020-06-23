import Modal from 'react-native-modal';
import TimeInput from '../../TimeInput';
import CloseModalButton from '../../CloseModalButton';
import React from 'react';

function SetTimeModal(props) {
  const { isVisible, value, onClosePress, label } = props;
  return (
    <Modal isVisible={isVisible}>
      <TimeInput value={value} label={label} />
      <CloseModalButton onPress={onClosePress} />
    </Modal>
  );
}

export default SetTimeModal;
