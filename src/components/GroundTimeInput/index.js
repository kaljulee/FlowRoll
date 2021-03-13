import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Text } from 'native-base';
import { TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SecondSlider from '../SecondSlider';

function calculateGroundTime(w, r, c) {
  return w + r + c;
}

function PhaseColumn(props) {
  const { value, title } = props;
  return (
    <Col
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <PhaseTitle title={title} />
      <PhaseInput value={value} />
    </Col>
  );
}

function PhaseTitle(props) {
  return <Text textAlign={'center'}>{props.title}</Text>;
}

function PhaseInput(props) {
  return <TextInput textAlign={'center'} value={props.value.toString()} />;
}

function GroundTimeInput(props) {
  const { workTime, warmUp, coolDown, setPhaseTimes } = props;

  const [totalTime, setTotalTime] = useState(
    calculateGroundTime(warmUp, workTime, coolDown),
  );
  const [warmUpValue, setWarmUpValue] = useState(warmUp);
  const [coolDownValue, setCoolDownValue] = useState(coolDown);
  const [workTimeValue, setWorkTimeValue] = useState(workTime);

  useEffect(() => {
    const newTotalTime = calculateGroundTime(warmUp, workTime, coolDown);
    setCoolDownValue(coolDown);
    setWorkTimeValue(workTime);
    setWarmUpValue(warmUp);
    setTotalTime(newTotalTime);
  }, [warmUp, workTime, coolDown]);

  const onSliderChange = (newValues) => {
    const newWarmUpValue = newValues[0];

    let newWorkTime = workTimeValue;
    newWorkTime = newWorkTime + (warmUpValue - newWarmUpValue);
    const newCoolDownValue = Math.abs(totalTime - newValues[1]);
    newWorkTime = newWorkTime + (coolDownValue - newCoolDownValue);

    return {
      newWorkTime,
      newCoolDownValue,
      newWarmUpValue,
    };
  };

  const onValuesChange = (newValues) => {
    const { newWorkTime, newCoolDownValue, newWarmUpValue } = onSliderChange(
      newValues,
    );
    setWarmUpValue(newWarmUpValue);
    setCoolDownValue(newCoolDownValue);
    setWorkTimeValue(newWorkTime);
  };

  const onValuesChangeFinish = (newValues) => {
    const { newWorkTime, newCoolDownValue, newWarmUpValue } = onSliderChange(
      newValues,
    );
    setPhaseTimes({
      warmUp: newWarmUpValue,
      coolDown: newCoolDownValue,
      workTime: newWorkTime,
    });
  };

  const onChangeTotalTime = (time) => {
    const timeDiff = time - totalTime;
    let newWorkTime;

    // default is to take time out of work time
    // if there is not enough work time to cover the change, remove cooldown and warmup.
    // not ideal, but simple.
    // todo make this ideal
    if (timeDiff * -1 <= workTime) {
      newWorkTime = workTime + timeDiff;
      setTotalTime(time);
      setWorkTimeValue(newWorkTime);
      setPhaseTimes({ workTime: newWorkTime, coolDown, warmUp });
    } else {
      setTotalTime(time);
      setPhaseTimes({ workTime: time });
    }
  };

  const onSecondSliderChange = (arg) => {
    onChangeTotalTime(arg);
  };

  return (
    <Grid>
      <Row size={1}>
        <PhaseColumn title={'warmup'} value={warmUpValue} />
        <PhaseColumn title={'work'} value={workTimeValue} />
        <PhaseColumn title={'cooldown'} value={coolDownValue} />
      </Row>
      <Row size={1} style={{ justifyContent: 'center' }}>
        <MultiSlider
          values={[warmUpValue, Math.abs(totalTime - coolDownValue)]}
          enabledOne={true}
          enabledTwo={true}
          min={0}
          max={totalTime}
          onValuesChange={onValuesChange}
          onValuesChangeFinish={onValuesChangeFinish}
        />
      </Row>
      <Row size={2} style={{ display: 'flex', justifyContent: 'center' }}>
        <Text>{`Total Round Time ${totalTime}`}</Text>
        <SecondSlider
          isVisible={true}
          seconds={totalTime}
          onValueChange={onSecondSliderChange}
        />
        {false && (
          <TextInput
            keyboardType={'number-pad'}
            onChangeText={onChangeTotalTime}
            textAlign={'center'}>
            <Text>{totalTime.toString()}</Text>
          </TextInput>
        )}
      </Row>
    </Grid>
  );
}

GroundTimeInput.defaultProps = { workTime: 10, warmUp: 0, coolDown: 0 };

export default GroundTimeInput;
