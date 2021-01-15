import React, { useState } from 'react';
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
import { Grid, Col } from 'react-native-easy-grid';
import { StyleSheet, Switch, TextInput } from 'react-native';

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
  const { isVisible, closeModal } = props;
  const [addToActive, setAddToActive] = useState(true);
  const [name, setName] = useState(null);
  function onChangeText(text) {
    setName(text);
  }

  const addParticipant = () => console.log('would add participant');

  return (
    <Modal style={styles.modal} isVisible={isVisible}>
      <Card style={styles.card} transparent>
        <CardItem style={styles.cardItem}>
          {false && (
            <TextInput
              onChangeText={(text) => onChangeText(text)}
              value={name}
            />
          )}
          <Form style={{ width: '100%', height: 80 }}>
            <Item floatingLabel>
              <Label>Participant Name</Label>
              <Input />
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
              <Button onPress={closeModal}>
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddParticipantModal);
