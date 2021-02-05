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
import { addLegType } from '../../../actions';
import { connect } from 'react-redux';
import SecondSlider from '../../SecondSlider';
import { hourMinuteSecond, secondsToHMS } from '../../../helpers/time';
import ColorPicker from '../../ColorPicker';
import { COLORS } from '../../../constants/styleValues';

function AddLegTypeModal(props) {
  const { isVisible, closeModal, addLegType } = props;
  const [name, setName] = useState(null);
  const [durationInSeconds, _setDurationInSeconds] = useState(0);
  const [hmsDuration, _setHmsDuration] = useState({ h: 0, m: 0, s: 0 });
  const [displayDuration, setDisplayDuration] = useState('no duration');
  const [editDuration, setEditDuration] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(COLORS.MINT);

  const toggleEditDuration = () => {
    setEditDuration(!editDuration);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const setHmsDuration = (seconds) => {
    const hms = secondsToHMS(seconds);
    _setHmsDuration(hms);
    setDisplayDuration(hourMinuteSecond(hms));
  };

  const setDurationInSeconds = (value) => {
    // const minp = 0;
    // const maxp = 300;
    // const minv = Math.log(1);
    // const maxv = Math.log(3600);
    // const scale = (maxv - minv) / (maxp - minp);
    // const output = Math.exp(minv + scale * (value - minp));
    // console.log(output);
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
  };

  function isValid() {
    return name !== null && name.length > 0;
  }

  const onAddPress = () => {
    console.log('onAddPress - maybe validate here?');
    if (isValid(name)) {
      console.log('would update with name ' + name);
      addLegType({ legType: { name, color, duration: hmsDuration } });
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
          </Form>
          <SecondSlider
            isVisible={editDuration}
            value={durationInSeconds}
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
  addLegType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddLegTypeModal);
