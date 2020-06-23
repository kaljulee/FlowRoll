import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Card, CardItem } from 'native-base';
import Modal from 'react-native-modal';
import CloseModalButton from '../../../components/CloseModalButton';
import ParticipantManager from '../../../components/ParticipantManager';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },
});

function ManageParticipantsModal(props) {
  const { participants, isVisible, onClosePress } = props;
  return (
    <Modal isVisible={isVisible}>
      <Card style={styles.card}>
        <CardItem>
          <ParticipantManager participants={participants}/>
        </CardItem>
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
