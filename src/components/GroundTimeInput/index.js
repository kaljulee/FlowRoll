import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Text } from 'native-base';
import { TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SecondSlider from '../SecondSlider';
import { formatSecondsToDisplay } from '../../helpers/time';

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
  const { work, warmUp, coolDown, setPhaseTimes } = props;

  const [totalTime, setTotalTime] = useState(
    calculateGroundTime(warmUp, work, coolDown),
  );
  const [warmUpValue, setWarmUpValue] = useState(warmUp);
  const [coolDownValue, setCoolDownValue] = useState(coolDown);
  const [workValue, setWorkTimeValue] = useState(work);

  useEffect(() => {
    const newTotalTime = calculateGroundTime(warmUp, work, coolDown);
    setCoolDownValue(coolDown);
    setWorkTimeValue(work);
    setWarmUpValue(warmUp);
    setTotalTime(newTotalTime);
  }, [warmUp, work, coolDown]);

  const onSliderChange = (newValues) => {
    const newWarmUpValue = newValues[0];

    let newWorkTime = workValue;
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
      work: newWorkTime,
    });
  };

  const onChangeTotalTime = (time) => {
    const timeDiff = time - totalTime;
    let newWorkTime;

    // default is to take time out of work time
    // if there is not enough work time to cover the change, remove cooldown and warmup.
    // not ideal, but simple.
    // todo make this ideal
    if (timeDiff * -1 <= work) {
      newWorkTime = work + timeDiff;
      setTotalTime(time);
      setWorkTimeValue(newWorkTime);
      setPhaseTimes({ work: newWorkTime, coolDown, warmUp });
    } else {
      setTotalTime(time);
      setPhaseTimes({ work: time });
    }
  };

  const onSecondSliderChange = (arg) => {
    onChangeTotalTime(arg);
  };

  return (
    <Grid>
      <Row size={1}>
        <PhaseColumn
          title={'warmup'}
          value={formatSecondsToDisplay(warmUpValue)}
        />
        <PhaseColumn title={'work'} value={formatSecondsToDisplay(workValue)} />
        <PhaseColumn
          title={'cooldown'}
          value={formatSecondsToDisplay(coolDownValue)}
        />
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
        <Text>{`Total Round Time ${formatSecondsToDisplay(totalTime)}`}</Text>
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

GroundTimeInput.defaultProps = { work: 10, warmUp: 0, coolDown: 0 };

export default GroundTimeInput;
