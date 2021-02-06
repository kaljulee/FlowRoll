import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
  Form,
  Item,
  Input,
  Card,
  CardItem,
  Label,
  Button,
  Text,
} from 'native-base';
import { hourMinuteSecond, ZERO_TIME } from '../../../helpers/time';
import { COLORS } from '../../../constants/styleValues';
import { connect } from 'react-redux';

function EditLegTypeModal(props) {
  console.log(props);
  const { name, runTime, color, id } = props;
  const [newName, setNewName] = useState(name);
  const [newRunTime, setNewRunTime] = useState(runTime);
  const [newColor, setNewColor] = useState(color);

  function toggleEditRunTime() {}

  function toggleEditColor() {}

  return (
    <Modal isVisible={!!id}>
      <Card>
        <CardItem>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input value={newName} />
            </Item>
            <Item stackedLabel>
              <Label>Run Time</Label>
              <Button transparent onPress={toggleEditRunTime}>
                <Text>{newRunTime}</Text>
              </Button>
            </Item>
            <Item stackedLabel>
              <Label>Color</Label>
              <Button
                style={{ backgroundColor: newColor }}
                onPress={toggleEditColor}>
                <Text>Color</Text>
              </Button>
            </Item>
          </Form>
        </CardItem>
      </Card>
    </Modal>
  );
}

EditLegTypeModal.defaultProps = {};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLegTypeModal);
