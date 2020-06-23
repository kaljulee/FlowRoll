import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Card, Item } from 'native-base';
import Modal from 'react-native-modal';
import CloseModalButton from '../../../components/CloseModalButton';

function ManageParticipantsModal(props) {
  const { participants, isVisible, onClosePress } = props;
  return (
    <Modal isVisible={isVisible}>
      <Card>
        <Item>
          <Text>manageparticipantsmodal</Text>
        </Item>
      </Card>
      <CloseModalButton onPress={onClosePress} />
    </Modal>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { participants },
  } = state;
  return {
    participants,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageParticipantsModal);
