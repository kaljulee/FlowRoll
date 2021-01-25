import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import Modal from 'react-native-modal';
import CloseModalButton from '../../../components/CloseModalButton';
import ParticipantManager from '../../../components/ParticipantManager';
import Icon from 'react-native-vector-icons/Entypo';
import AddParticipantButton from '../../../components/AddParticipantButton';
import { Grid, Col } from 'react-native-easy-grid';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '80%',
    width: '100%',
  },
});

function ManageParticipantsModal(props) {
  const {
    participants,
    isVisible,
    onClosePress,
    onAddParticipantPress,
    onLongPressParticipant,
  } = props;
  return (
    <Modal style={{ height: '100%' }} isVisible={isVisible}>
      <Card style={styles.card}>
        <CardItem>
          <ParticipantManager
            onLongPressParticipant={onLongPressParticipant}
            participants={participants}
          />
        </CardItem>
      </Card>
      <Grid
        style={{
          height: '20%',
          borderColor: 'black',
          borderWidth: 2,
          padding: 5,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Col>
          <AddParticipantButton onPress={onAddParticipantPress} />
        </Col>
        <Col>
          <CloseModalButton onPress={onClosePress} />
        </Col>
      </Grid>
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
