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
import { Grid, Col } from 'react-native-easy-grid';
import {
  formatSecondsToDisplay,
} from '../../../helpers/time';
import { connect } from 'react-redux';
import SecondSlider from '../../Inputs/SecondSlider';
import ColorPicker from '../../Inputs/ColorPicker';
import { deleteRouteType, editRouteType } from '../../../actions';
import GearSelector from '../../Mechanics/GearSelector';
//todo find a way to combine editRoute and addRoute modals
function EditRouteTypeModal(props) {
  const { closeModal, editRouteType, editRoute, deleteRouteType } = props;

  const { name, runTime, color, id, gear } = editRoute;
  const [routeID, setRouteID] = useState(id);
  const [newName, setNewName] = useState(name);
  const [newRunTime, setNewRunTime] = useState(runTime);
  const [newColor, setNewColor] = useState(color);
  const [showEditRunTimeModal, setShowEditRunTimeModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [runTimeInSeconds, _setRunTimeInSeconds] = useState(runTime);
  const [newGear, setNewGear] = useState(gear);

  function onColorPress(c) {
    setNewColor(c);
    setShowColorPicker(false);
  }

  function setRunTimeInSeconds(arg) {
    _setRunTimeInSeconds(arg);
  }

  function toggleEditRunTime() {
    setShowEditRunTimeModal(!showEditRunTimeModal);
  }

  function toggleEditColor() {
    setShowColorPicker(!showColorPicker);
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
      gear: newGear,
    };
    editRouteType(payload);
    setShowColorPicker(false);
    closeModal();
  }

  function onPressDeleteRouteType() {
    deleteRouteType({ id: routeID });
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
      setNewGear(editRoute.gear);
      setRunTimeInSeconds(editRoute.runTime);
    }
  }, [editRoute]);

  useEffect(() => {
    setNewRunTime(runTimeInSeconds);
  }, [runTimeInSeconds]);

  return (
    <Modal isVisible={!!routeID}>
      <Card style={{ width: '100%' }}>
        <CardItem>
          <Form style={{ width: '100%' }}>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input onChangeText={onNameChange} value={newName} />
            </Item>
            <Item stackedLabel>
              <Label>Run Time</Label>
              <Button transparent onPress={toggleEditRunTime}>
                <Text>{formatSecondsToDisplay(newRunTime)}</Text>
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
            <Item stackedLabel>
              <Label>Gear</Label>
              <GearSelector setGear={setNewGear} gear={newGear} />
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
            isVisible={showColorPicker}
            onColorPress={onColorPress}
          />
        </CardItem>
        <CardItem>
          <Grid>
            <Col>
              <Button onPress={saveAndClose}>
                <Text>Save</Text>
              </Button>
              <Button onPress={closeModal}>
                <Text>Cancel</Text>
              </Button>
            </Col>
            <Col>
              <Button
                warning={true}
                style={{ marginLeft: 0, justifySelf: 'flex-end' }}
                onPress={onPressDeleteRouteType}>
                <Text style={{ color: 'black' }}>Delete</Text>
              </Button>
            </Col>
          </Grid>
        </CardItem>
      </Card>
    </Modal>
  );
}

EditRouteTypeModal.defaultProps = { editRoute: { id: false, runTime: 0 } };

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = { editRouteType, deleteRouteType };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditRouteTypeModal);
