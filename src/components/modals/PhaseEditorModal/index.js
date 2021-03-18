import React, { useState, useEffect } from 'react';
import { Grid, Col } from 'react-native-easy-grid';
import { Picker, Button, Text, Card, CardItem } from 'native-base';
import Modal from 'react-native-modal';
import { HMSToSeconds, secondsToHMS } from '../../../helpers/time';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 5,
    backgroundColor: 'blue',
  },
  grid: {
    borderColor: 'yellow',
    borderWidth: 4,
    height: 'auto',
    width: '100%',
  },
};

function PhaseEditorModal(props) {
  const { phase, phaseValues, onClose, showEditor } = props;

  const valueAsHMS = secondsToHMS(phaseValues[phase]);
  const [hourValue, setHourValue] = useState(valueAsHMS.h);
  const [minuteValue, setMinuteValue] = useState(valueAsHMS.m);
  const [secondValue, setSecondValue] = useState(valueAsHMS.s);

  // value is converted to HMS in order to present data to pickers
  useEffect(() => {
    const newValueAsHMS = secondsToHMS(phaseValues[phase]);
    setHourValue(newValueAsHMS.h);
    setMinuteValue(newValueAsHMS.m);
    setSecondValue(newValueAsHMS.s);
  }, [phase, phaseValues]);

  function createZeroToFiftyNine() {
    const zeroToFifyNine = [];

    for (let i = 0; i < 60; i += 1) {
      zeroToFifyNine.push(
        <Picker.Item key={`ztfn${i}`} label={i.toString()} value={i} />,
      );
    }
    return zeroToFifyNine;
  }

  function onPressCancel() {
    onClose();
  }

  // this is where the values new values are pushed back up to the parent
  // for whatever the modal is being used for.
  // only the edited phase value in seconds gets returned, not an entire set
  // of phase values.  Some higher component controls how the other phase
  // values are impacted, or if this value is considered valid.
  function onPressSave() {
    const newValueInSeconds = HMSToSeconds({
      h: hourValue,
      m: minuteValue,
      s: secondValue,
    });
    onClose(newValueInSeconds);
  }

  function createZeroToTwelve() {
    const zeroToTwelve = [];

    for (let i = 0; i < 13; i += 1) {
      zeroToTwelve.push(
        <Picker.Item key={`ztt${i}`} label={i.toString()} value={i} />,
      );
    }
    return zeroToTwelve;
  }

  function onMinuteValueChange(arg) {
    console.log('min change');
    console.log(arg);
    setMinuteValue(arg);
  }

  function onSecondValueChange(arg) {
    console.log('sec change');
    console.log(arg);
    setSecondValue(arg);
  }

  function onHourValueChange(arg) {
    console.log('hour change');
    console.log(arg);
    setHourValue(arg);
  }

  return (
    <Modal style={styles.modal} isVisible={showEditor}>
      <Card style={{ width: '100%', height: '100%' }}>
        <CardItem style={{}}>
          <Grid style={styles.grid}>
            <Col
              style={{
                borderColor: 'purple',
                borderWidth: 3,
              }}>
              <Picker
                onValueChange={onHourValueChange}
                selectedValue={hourValue}>
                {createZeroToTwelve()}
              </Picker>
            </Col>
            <Col>
              <Picker
                onValueChange={onMinuteValueChange}
                selectedValue={minuteValue}>
                {createZeroToFiftyNine()}
              </Picker>
            </Col>
            <Col>
              <Picker
                onValueChange={onSecondValueChange}
                selectedValue={secondValue}>
                {createZeroToFiftyNine()}
              </Picker>
            </Col>
          </Grid>
        </CardItem>
        <CardItem style={{ justifyContent: 'space-around' }}>
          <Button onPress={onPressSave}>
            <Text>Save</Text>
          </Button>
          <Button onPress={onPressCancel}>
            <Text>Cancel</Text>
          </Button>
        </CardItem>
      </Card>
    </Modal>
  );
}

export default PhaseEditorModal;
