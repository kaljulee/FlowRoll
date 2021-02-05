import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import {
  Button,
  Card,
  CardItem,
  Text,
  Form,
  Input,
  Item,
  Label,
} from 'native-base';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { StyleSheet, Switch, ToastAndroid } from 'react-native';
import { addParticipants, activateParticipants } from '../../../actions';

const styles = StyleSheet.create({
  card: {
    borderColor: 'blue',
    borderWidth: 5,
    height: '80%',
    width: '100%',
    display: 'flex',
  },
  cardItem: {
    borderColor: 'yellow',
    borderWidth: 4,
    width: '100%',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 5,
  },
  grid: {
    height: 'auto',
  },
});

function AddParticipantModal(props) {
  const {
    isVisible,
    closeModal,
    addParticipants,
    activateParticipants,
  } = props;

  const [addToActive, setAddToActive] = useState(true);
  const [name, setName] = useState(null);

  const onCloseModal = (arg) => {
    setName(null);
    closeModal(arg);
  };

  const onChangeText = (text) => {
    console.log('CALLING ONCHANGE');
    console.log(text);
    setName(text);
  };

  function isValid() {
    return name !== null && name.length > 0;
  }

  const addParticipant = () => {
    if (isValid(name)) {
      addParticipants({ participants: [{ name }], activate: addToActive });
    } else {
      ToastAndroid.show('name not valid for some reason', ToastAndroid.SHORT);
    }
  };

  return (
    <Modal style={styles.modal} isVisible={isVisible}>
      <Card style={styles.card} transparent>
        <CardItem style={styles.cardItem}>
          <Form style={{ width: '100%', height: 80 }}>
            <Item stackedLabel>
              <Label>Participant Name</Label>
              <Input onChangeText={onChangeText} />
            </Item>
            <Item inlineLabel>
              <Switch
                style={{ marginLeft: 'auto' }}
                value={addToActive}
                onValueChange={() => setAddToActive(!addToActive)}
              />
              <Label>add to active</Label>
            </Item>
          </Form>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <Grid style={styles.grid}>
            <Col>
              <Button onPress={addParticipant}>
                <Text>Add</Text>
              </Button>
            </Col>
            <Col>
              <Button onPress={onCloseModal}>
                <Text>Cancel</Text>
              </Button>
            </Col>
          </Grid>
        </CardItem>
      </Card>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  activateParticipants,
  addParticipants,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddParticipantModal);
