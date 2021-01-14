import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import Modal from 'react-native-modal';
import CloseModalButton from '../../../components/CloseModalButton';
import ParticipantManager from '../../../components/ParticipantManager';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '60%',
    width: '100%',
  },
});

function ManageParticipantsModal(props) {
  const { participants, isVisible, onClosePress } = props;
  return (
    <Modal isVisible={isVisible}>
      <Card style={styles.card}>
        <CardItem>
          <ParticipantManager participants={participants} />
        </CardItem>
        <CardItem>
          <Button
            style={{
              height: 45,
              width: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              style={{ color: 'white', fontSize: 25, padding: 1 }}
              name={'add-user'}
            />
          </Button>
          <CloseModalButton onPress={onClosePress} />
        </CardItem>
      </Card>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { participants },
  } = state;
  return {
    // participants,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageParticipantsModal);
