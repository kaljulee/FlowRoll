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
import { ToastAndroid } from 'react-native';
import { addRouteType } from '../../../actions';
import { connect } from 'react-redux';
import SecondSlider from '../../SecondSlider';
import { hourMinuteSecond, secondsToHMS } from '../../../helpers/time';
import ColorPicker from '../../ColorPicker';
import { COLORS } from '../../../constants/styleValues';
import GearSelector from '../../GearSelector';
import { Gears } from '../../../models/Gears';
// todo this needs to be reworked to deal with int runTimes
// todo also the color picker is broken either here or in edit
function AddRouteTypeModal(props) {
  const { isVisible, closeModal, addRouteType } = props;
  const [name, setName] = useState(null);
  const [durationInSeconds, _setDurationInSeconds] = useState(0);
  const [displayDuration, setDisplayDuration] = useState('no duration');
  const [editDuration, setEditDuration] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(COLORS.MINT);
  const [newGear, setNewGear] = useState(Gears.NEUTRAL);

  const toggleEditDuration = () => {
    setEditDuration(!editDuration);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const setHmsDuration = (seconds) => {
    const hms = secondsToHMS(seconds);
    setDisplayDuration(hourMinuteSecond(hms));
  };

  const setDurationInSeconds = (value) => {
    _setDurationInSeconds(value);
  };

  useEffect(() => {
    setHmsDuration(durationInSeconds);
  }, [durationInSeconds]);

  const onNameChange = (text) => {
    setName(text);
  };

  const onColorPress = (c) => {
    setColor(c);
    setShowColorPicker(false);
  };

  function isValid() {
    return name !== null && name.length > 0;
  }

  const onAddPress = () => {
    console.log('onAddPress - maybe validate here?');
    if (isValid(name)) {
      addRouteType({
        routeType: {
          name,
          color: color,
          runTime: durationInSeconds,
          gear: newGear,
        },
      });
      setName(null);
      closeModal();
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
            <Item stackedLabel>
              <Label>Time</Label>
              <Button transparent onPress={toggleEditDuration}>
                <Text>{displayDuration}</Text>
              </Button>
            </Item>
            <Item stackedLabel>
              <Button
                style={{ backgroundColor: color }}
                onPress={toggleColorPicker}>
                <Text>color picker</Text>
              </Button>
            </Item>
            <Item stackedLabel>
              <Label>Gear</Label>
              <GearSelector setGear={setNewGear} gear={newGear} />
            </Item>
          </Form>
          <SecondSlider
            isVisible={editDuration}
            seconds={durationInSeconds}
            onValueChange={(arg) => {
              setDurationInSeconds(arg);
            }}
          />
          <ColorPicker
            isVisible={showColorPicker}
            onColorPress={onColorPress}
          />
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
  addRouteType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddRouteTypeModal);
