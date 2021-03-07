import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { ToastAndroid } from 'react-native';
import { Button, Card, CardItem, Text } from 'native-base';
import { deleteParticipants } from '../../../actions';
import { findParticipantByID } from '../../../helpers/utils';

function DeleteParticipantModal(props) {
  const {
    deleteParticipants,
    deletableParticipant,
    closeModal,
    participants,
  } = props;
  const participant = findParticipantByID(
    participants,
    deletableParticipant,
  ) || { id: null, name: 'ERROR' };
  return (
    <Modal style={{ height: '100%' }} isVisible={!!deletableParticipant}>
      <Card>
        <CardItem style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            danger
            onPress={() => {
              deleteParticipants([participant.id]);
              ToastAndroid.show(
                `deleting ${participant.name}`,
                ToastAndroid.SHORT,
              );
              closeModal();
            }}>
            <Text>{`Delete ${participant.name}?`}</Text>
          </Button>
          <Button info onPress={closeModal}>
            <Text>{"don't delete"}</Text>
          </Button>
        </CardItem>
      </Card>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  const {
    groundRobin: { participants },
  } = state;
  return { participants };
};

const mapDispatchToProps = {
  deleteParticipants,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteParticipantModal);
