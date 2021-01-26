import Modal from 'react-native-modal';
import TimeInput from '../../TimeInput';
import CloseModalButton from '../../CloseModalButton';
import React from 'react';

function SetTimeModal(props) {
  const { isVisible, value, onClosePress, label, onSelectedChange } = props;

  return (
    <Modal isVisible={isVisible}>
      <TimeInput
        value={value}
        label={label}
        onSelectedChange={onSelectedChange}
      />
      <CloseModalButton onPress={onClosePress} />
    </Modal>
  );
}

export default SetTimeModal;
