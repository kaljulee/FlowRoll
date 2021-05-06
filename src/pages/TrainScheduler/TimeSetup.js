import { Grid, Row, Col } from 'react-native-easy-grid';
import { Text, Picker, CheckBox } from 'native-base';
import React from 'react';
import GroundTimeInput from '../../components/Mechanics/GroundTimeInput';
import NumberInput from '../../components/Inputs/NumberInput';

function IntegerInput(props) {
  const { label, value, onValueChange } = props;
  return (
    <Grid style={{ width: '100%', height: '100%' }}>
      <Col>
        <NumberInput value={value} onValueChange={onValueChange} />
      </Col>
      <Col>
        <Text>{label}</Text>
      </Col>
    </Grid>
  );
}

function TimeSetup(props) {
  function setPhaseTimes(arg) {
    console.log('trying to set phase times from slider');
    console.log(arg);
  }

  const structureOptions = [
    { label: 'round robin' },
    { label: 'solid block' },
    { label: 'rotate through' },
  ];

  const structureOptionsComponents = structureOptions.map((option, i) => {
    return <Picker.Item label={option.label} key={i} />;
  });

  return (
    <Grid style={{ backgroundColor: 'coral' }}>
      <Row>
        <Picker mode="dropdown">{structureOptionsComponents}</Picker>
      </Row>
      <Row>
        <IntegerInput value={1} label={'repeat all'} />
      </Row>
      <Row>
        <IntegerInput value={1} label={'repeat individual'} />
      </Row>
      <Row>
        <GroundTimeInput
          setPhaseTimes={setPhaseTimes}
          work={30}
          warmUp={5}
          coolDown={0}
        />
      </Row>
    </Grid>
  );
}

export default TimeSetup;
