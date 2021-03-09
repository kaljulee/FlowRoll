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
import { editRouteType } from '../../../actions';

function EditRouteTypeModal(props) {
  const { closeModal, editRouteType, editRoute } = props;

  const { name, runTime, color, iid } = editRoute;

  const [routeID, setRouteID] = useState(iid);
  const [newName, setNewName] = useState(name);
  const [newRunTime, setNewRunTime] = useState(runTime);
  const [newColor, setNewColor] = useState(color);
  const [showEditRunTimeModal, setShowEditRunTimeModal] = useState(false);
  const [showEditColorModal, setShowEditColorModal] = useState(false);
  const [runTimeInSeconds, _setRunTimeInSeconds] = useState(
    runTime,
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
    if (!routeID) {
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
      id: routeID,
      runTime: newRunTime,
      color: newColor,
      name: newName,
    };
    editRouteType(payload);
    closeModal();
  }

  function onNameChange(text) {
    setNewName(text);
  }

  function isValid() {
    return name !== null && name.length > 0;
  }

  useEffect(() => {
    if (editRoute) {
      setRouteID(editRoute.id);
      setNewName(editRoute.name);
      setNewRunTime(editRoute.runTime);
      setNewColor(editRoute.color);
      setRunTimeInSeconds(editRoute.runTime);
    }
  }, [editRoute]);

  useEffect(() => {
    setNewRunTime(runTimeInSeconds);
  }, [runTimeInSeconds]);

  return (
    <Modal isVisible={!!routeID}>
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

EditRouteTypeModal.defaultProps = { editRoute: { id: false, runTime: 0 } };

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = { editRouteType };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditRouteTypeModal);
