import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Text, Button } from 'native-base';
import { TextInput, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SecondSlider from '../../Inputs/SecondSlider';
import { formatSecondsToDisplay } from '../../../helpers/time';
import { createPhaseValues, PHASES } from '../../../models/Gears';
import PhaseEditorModal from '../../modals/PhaseEditorModal';

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
  // todo create usePhaseValues hook
  const [warmUpValue, setWarmUpValue] = useState(warmUp);
  const [coolDownValue, setCoolDownValue] = useState(coolDown);
  const [workValue, setWorkValue] = useState(work);
  const [phaseToEdit, setPhaseToEdit] = useState(undefined);
  const [showEditor, setShowEditor] = useState(false);

  //////////////////////////////////
  // updates total time to adjust for changes to phase times
  useEffect(() => {
    const newTotalTime = calculateGroundTime(warmUp, work, coolDown);
    setCoolDownValue(coolDown);
    setWorkValue(work);
    setWorkValue(work);
    setWarmUpValue(warmUp);
    setTotalTime(newTotalTime);
  }, [warmUp, work, coolDown]);

  // converts multislider to phase values
  // todo convert this to createPhaseValues
  const convertMultiSliderToPhase = (newValues) => {
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

  /////////////////////////////////
  // generic change functions
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
      setWorkValue(newWorkTime);
      // todo these should use createPhaseValues
      setPhaseTimes({ work: newWorkTime, coolDown, warmUp });
    } else {
      setTotalTime(time);
      setPhaseTimes({ work: time });
    }
  };
  function setPhaseToChange({ phase, value }) {
    setPhaseToEdit(phase);
    setShowEditor(true);
  }

  ////////////////////////////////
  // picker functions

  ///////////////////////////////
  // slider functions
  // phase slider
  // todo convert to createPhaseValues
  const onPhaseSliderChangeFinish = (newValues) => {
    const {
      newWorkTime,
      newCoolDownValue,
      newWarmUpValue,
    } = convertMultiSliderToPhase(newValues);
    setPhaseTimes({
      warmUp: newWarmUpValue,
      coolDown: newCoolDownValue,
      work: newWorkTime,
    });
  };
  const onPhaseSliderChange = (newValues) => {
    const {
      newWorkTime,
      newCoolDownValue,
      newWarmUpValue,
    } = convertMultiSliderToPhase(newValues);
    setWarmUpValue(newWarmUpValue);
    setCoolDownValue(newCoolDownValue);
    setWorkValue(newWorkTime);
  };
  // total slider
  const onTotalSliderChange = (arg) => {
    onChangeTotalTime(arg);
  };

  const onCloseTimeModal = useCallback(
    (newTime) => {
      if (newTime) {
        switch (phaseToEdit) {
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
      // setEditValue(undefined);
      const newPhaseTimes = createPhaseValues({ warmUp, coolDown, work });
      newPhaseTimes[phaseToEdit] = newTime;
      // todo this is hideous.  action should take a phaseValue object
      setPhaseTimes({
        work: newPhaseTimes[PHASES.WORK],
        warmUp: newPhaseTimes[PHASES.WARMUP],
        coolDown: newPhaseTimes[PHASES.COOLDOWN],
      });
      setPhaseToEdit(undefined);
      setShowEditor(false);
    },
    [phaseToEdit, warmUp, coolDown, work, setPhaseTimes],
  );

  const openEditor = useCallback(
    (phase) => {
      console.log(phase);
      if (phase === PHASES.WARMUP) {
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
            onValuesChange={onPhaseSliderChange}
            onValuesChangeFinish={onPhaseSliderChangeFinish}
          />
        </Row>
        <Row size={2} style={{ display: 'flex', justifyContent: 'center' }}>
          <Text>{`Total Round Time ${formatSecondsToDisplay(totalTime)}`}</Text>
          <SecondSlider
            isVisible={true}
            seconds={totalTime}
            onValueChange={onTotalSliderChange}
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
        phase={phaseToEdit}
        phaseValues={createPhaseValues({
          work: workValue,
          warmUp: warmUpValue,
          coolDown: coolDownValue,
        })}
        onClose={onCloseTimeModal}
      />
    </View>
  );
}

GroundTimeInput.defaultProps = { work: 10, warmUp: 0, coolDown: 0 };

export default GroundTimeInput;
