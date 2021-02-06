import React from 'react';
import Modal from 'react-native-modal';
import { Card, CardItem, Text, Button } from 'native-base';

function ConfirmDeleteModal(props) {
  const { deletionText, closeModal, confirmDelete, idToDelete } = props;
  return (
    <Modal isVisible={idToDelete !== null}>
      <Card>
        <CardItem>
          <Text>{deletionText || 'really delete?'}</Text>
        </CardItem>
        <CardItem>
          <Button danger onPress={() => confirmDelete(idToDelete)}>
            <Text>Yes, Delete</Text>
          </Button>
          <Button onPress={closeModal}>
            <Text>Nevermind</Text>
          </Button>
        </CardItem>
      </Card>
    </Modal>
  );
}

export default ConfirmDeleteModal;
