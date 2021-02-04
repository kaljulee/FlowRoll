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
import { ToastAndroid } from 'react-native';
import { addLegType } from '../../../actions';
import { connect } from 'react-redux';

function AddLegTypeModal(props) {
  const { isVisible, closeModal, addLegType } = props;
  const [name, setName] = useState(null);

  const onNameChange = (text) => {
    setName(text);
  };

  function isValid() {
    return name !== null && name.length > 0;
  }

  const onAddPress = () => {
    console.log('onAddPress - maybe validate here?');
    if (isValid(name)) {
      console.log('would update with name ' + name);
      addLegType({ legType: { name } });
      setName(null);
    } else {
      ToastAndroid.show(
        'name not valid for some reason ' + name,
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <Card>
        <CardItem>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input onChangeText={onNameChange} />
            </Item>
          </Form>
        </CardItem>
        <CardItem>
          <Button onPress={onAddPress}>
            <Text>Add</Text>
          </Button>
          <Button onPress={closeModal}>
            <Text>Close</Text>
          </Button>
        </CardItem>
      </Card>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  addLegType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddLegTypeModal);
