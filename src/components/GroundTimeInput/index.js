import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Text, Button } from 'native-base';
import { TextInput, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SecondSlider from '../SecondSlider';
import { formatSecondsToDisplay } from '../../helpers/time';
import { PHASES } from '../../models/Gears';
import PhaseEditorModal from '../modals/PhaseEditorModal';

function calculateGroundTime(w, r, c) {
  return w + r + c;
}

function PhaseColumn(props) {
  const { value, title, openEditor } = props;
  return (
    <Col
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <PhaseTitle title={title} />
      <PhaseInput value={value} openEditor={openEditor} />
    </Col>
  );
}

function PhaseTitle(props) {
  return <Text textAlign={'center'}>{props.title}</Text>;
}

function PhaseInput(props) {
  const { openEditor } = props;
  const value = formatSecondsToDisplay(props.value);
  return (
    <Button onPress={openEditor}>
      <Text>{`${value}`}</Text>
    </Button>
  );
}

function GroundTimeInput(props) {
  const { work, warmUp, coolDown, setPhaseTimes } = props;

  const [totalTime, setTotalTime] = useState(
    calculateGroundTime(warmUp, work, coolDown),
  );
  const [warmUpValue, setWarmUpValue] = useState(warmUp);
  const [coolDownValue, setCoolDownValue] = useState(coolDown);
  const [workValue, setWorkValue] = useState(work);
  const [phaseToEdit, setPhaseToEdit] = useState(undefined);
  const [editValue, setEditValue] = useState(undefined);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const newTotalTime = calculateGroundTime(warmUp, work, coolDown);
    setCoolDownValue(coolDown);
    setWorkValue(work);
    setWorkValue(work);
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

  function onChangeWarmUp(arg) {
    console.log('warmup');
    console.log(arg);
    setWarmUpValue(arg);
  }

  function onChangeWork(arg) {
    console.log('work');
    console.log(arg);
    setWorkValue(arg);
  }

  function onChangeCoolDown(arg) {
    console.log('cool');
    console.log(arg);
    setCoolDownValue(arg);
  }

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
      setWorkTime(newWorkTime);
      setPhaseTimes({ work: newWorkTime, coolDown, warmUp });
    } else {
      setTotalTime(time);
      setPhaseTimes({ work: time });
    }
  };

  const onSecondSliderChange = (arg) => {
    onChangeTotalTime(arg);
  };

  function setPhaseToChange({ phase, value }) {
    console.log('in SPTC');
    console.log(value);
    setEditValue(value);
    setPhaseToEdit(phase);
    setShowEditor(true);
  }

  const onCloseTimeModal = useCallback(
    (newTime) => {
      console.log('in onClose with time ' + newTime);
      console.log('phasetoedit is');
      console.log(phaseToEdit);
      if (newTime) {
        switch(phaseToEdit) {
          case PHASES.COOLDOWN:
            setCoolDownValue(newTime);
            break;
          case PHASES.WARMUP:
            setWarmUpValue(newTime);
            break;
          case PHASES.WORK:
            setWorkValue(newTime);
            break;
          default:
            break;
        }
      }
      setEditValue(undefined);
      setPhaseToEdit(undefined);
      setShowEditor(false);
    },
    [setEditValue, setShowEditor, phaseToEdit],
  );

  const openEditor = useCallback(
    (phase) => {
      console.log('open editor phase');
      console.log(phase);
      if (phase === PHASES.WARMUP) {
        console.log('phase is warmup');
        setPhaseToChange({
          phase,
          value: warmUpValue,
        });
      } else if (phase === PHASES.WORK) {
        setPhaseToChange({ phase, value: workValue });
      } else if (phase === PHASES.COOLDOWN) {
        setPhaseToChange({
          phase,
          value: coolDownValue,
        });
      }
    },
    [
      workValue,
      warmUpValue,
      coolDownValue,
      // setWorkValue,
      // setCoolDownValue,
      // setWarmUpValue,
    ],
  );
  return (
    <View>
      <Grid>
        <Row size={1}>
          <PhaseColumn
            title={'warmup'}
            value={warmUpValue}
            openEditor={() => openEditor(PHASES.WARMUP)}
          />
          <PhaseColumn
            title={'work'}
            value={workValue}
            openEditor={() => openEditor(PHASES.WORK)}
          />
          <PhaseColumn
            title={'cooldown'}
            value={coolDownValue}
            openEditor={() => openEditor(PHASES.COOLDOWN)}
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
      <PhaseEditorModal
        showEditor={showEditor}
        value={editValue}
        onClose={onCloseTimeModal}
      />
    </View>
  );
}

GroundTimeInput.defaultProps = { work: 10, warmUp: 0, coolDown: 0 };

export default GroundTimeInput;
