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
import {
  HMSToSeconds,
  hourMinuteSecond,
  secondsToHMS,
  ZERO_TIME,
} from '../../../helpers/time';
import { COLORS } from '../../../constants/styleValues';
import { connect } from 'react-redux';
import SecondSlider from '../../SecondSlider';
import ColorPicker from '../../ColorPicker';
import { editLegType } from '../../../actions';

function EditLegTypeModal(props) {
  const { closeModal, editLegType, editLeg } = props;

  const { name, runTime, color, iid } = editLeg;

  const [legID, setLegID] = useState(iid);
  const [newName, setNewName] = useState(name);
  const [newRunTime, setNewRunTime] = useState(runTime);
  const [newColor, setNewColor] = useState(color);
  const [showEditRunTimeModal, setShowEditRunTimeModal] = useState(false);
  const [showEditColorModal, setShowEditColorModal] = useState(false);
  const [runTimeInSeconds, _setRunTimeInSeconds] = useState(
    HMSToSeconds(runTime),
  );

  function onColorPress() {}

  function setRunTimeInSeconds(arg) {
    _setRunTimeInSeconds(arg);
  }

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

    if (errorMessage) {
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return;
    }

    const payload = {
      id: legID,
      runTime: newRunTime,
      color: newColor,
      name: newName,
    };
    editLegType(payload);
    closeModal();
  }

  function onNameChange(text) {
    setNewName(text);
  }

  function isValid() {
    return name !== null && name.length > 0;
  }

  useEffect(() => {
    if (editLeg) {
      setLegID(editLeg.id);
      setNewName(editLeg.name);
      setNewRunTime(editLeg.runTime);
      setNewColor(editLeg.color);
      setRunTimeInSeconds(HMSToSeconds(editLeg.runTime));
    }
  }, [editLeg]);

  useEffect(() => {
    setNewRunTime(secondsToHMS(runTimeInSeconds));
  }, [runTimeInSeconds]);

  return (
    <Modal isVisible={!!legID}>
      <Card>
        <CardItem>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input onChangeText={onNameChange} value={newName} />
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
          <SecondSlider
            isVisible={setShowEditRunTimeModal}
            seconds={runTimeInSeconds}
            onValueChange={(arg) => {
              setRunTimeInSeconds(arg);
            }}
          />
          <ColorPicker
            isVisible={showEditColorModal}
            onColorPress={onColorPress}
          />
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

const mapDispatchToProps = { editLegType };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLegTypeModal);
