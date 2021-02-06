import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { ToastAndroid } from 'react-native';
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
  const { closeModal, editLegType, editLeg } = props;
  console.log('leg recd by editlegtypemodal');
  console.log(editLeg);

  const { name, runTime, color, iid } = editLeg;

  const [legID, setLegID] = useState(iid);
  const [newName, setNewName] = useState(name);
  const [newRunTime, setNewRunTime] = useState(runTime);
  const [newColor, setNewColor] = useState(color);
  const [showEditRunTimeModal, setShowEditRunTimeModal] = useState(false);
  const [showEditColorModal, setShowEditColorModal] = useState(false);

  function toggleEditRunTime() {
    setShowEditRunTimeModal(!showEditRunTimeModal);
  }

  function toggleEditColor() {
    setShowEditColorModal(!showEditColorModal);
  }

  function saveAndClose() {
    let errorMessage;
    if (!legID) {
      errorMessage = 'bad id';
    }
    if (!newRunTime) {
      errorMessage = 'bad run time';
    }
    if (!newColor) {
      errorMessage = 'bad color';
    }
    if (!newName) {
      errorMessage = 'bad name';
    }

    if (errorMessage.length > 0) {
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return;
    }

    editLegType({
      id: legID,
      data: { runTime: newRunTime, color: newColor, name: newName },
    });
  }

  useEffect(() => {
    if (editLeg) {
      setLegID(editLeg.id);
      setNewName(editLeg.name);
      setNewRunTime(editLeg.runTime);
      setNewColor(editLeg.color);
    }
  }, [editLeg]);

  return (
    <Modal isVisible={!!legID}>
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
                <Text>{hourMinuteSecond(newRunTime)}</Text>
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
        <CardItem>
          <Button onPress={saveAndClose}>
            <Text>Save</Text>
          </Button>
          <Button onPress={closeModal}>
            <Text>Cancel</Text>
          </Button>
        </CardItem>
      </Card>
    </Modal>
  );
}

EditLegTypeModal.defaultProps = { editLeg: { id: false, runTime: ZERO_TIME } };

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLegTypeModal);
