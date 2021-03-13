import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Text } from 'native-base';
import { TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

function calculateGroundTime(w, r, c) {
  return w + r + c;
}

function GroundTimeInput(props) {
  const { roundTime, warmUp, coolDown } = props;

  const [totalTime, setTotalTime] = useState(
    calculateGroundTime(warmUp, roundTime, coolDown),
  );
  const [warmUpValue, setWarmUpValue] = useState(warmUp);
  const [coolDownValue, setCoolDownValue] = useState(coolDown);
  const [roundTimeValue, setRoundTimeValue] = useState(roundTime);

  useEffect(() => {
    const newTotalTime = calculateGroundTime(warmUp, roundTime, coolDown);
    setCoolDownValue(coolDown);
    setRoundTimeValue(roundTime);
    setWarmUpValue(warmUp);
    setTotalTime(newTotalTime);
  }, [warmUp, roundTime, coolDown]);

  const onSliderChange = (newValues) => {
    const newWarmUpValue = newValues[0];

    let newRoundTime = roundTimeValue;
    newRoundTime = newRoundTime + (warmUpValue - newWarmUpValue);
    const newCoolDownValue = Math.abs(totalTime - newValues[1]);
    newRoundTime = newRoundTime + (coolDownValue - newCoolDownValue);
    setWarmUpValue(newWarmUpValue);
    setCoolDownValue(newCoolDownValue);
    setRoundTimeValue(newRoundTime);
  };

  return (
    <Grid>
      <Row>
        <Col>
          <TextInput textAlign={'center'} value={warmUpValue.toString()} />
        </Col>
        <Col>
          <TextInput textAlign={'center'} value={roundTimeValue.toString()} />
        </Col>
        <Col>
          <TextInput textAlign={'center'} value={coolDownValue.toString()} />
        </Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <MultiSlider
          values={[warmUpValue, Math.abs(totalTime - coolDownValue)]}
          enabledOne={true}
          enabledTwo={true}
          min={0}
          max={totalTime}
          onValuesChange={onSliderChange}
        />
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
        <TextInput textAlign={'center'} value={totalTime.toString()} />
      </Row>
    </Grid>
  );
}

GroundTimeInput.defaultProps = { roundTime: 10, warmUp: 0, coolDown: 0 };

export default GroundTimeInput;
