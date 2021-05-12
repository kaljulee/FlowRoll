import { Col, Grid } from 'react-native-easy-grid';
import NumberInput from '../../components/Inputs/NumberInput';
import { Text } from 'native-base';
import React from 'react';

// todo should enforce integerness of input
function IntegerInput(props) {
  const { label, value, onValueChange } = props;
  return (
    <Grid style={{ width: '100%', height: '100%' }}>
      <Col>
        <NumberInput value={value} onValueChange={onValueChange} />
      </Col>
      <Col style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, textAlign: 'center' }}>{label}</Text>
      </Col>
    </Grid>
  );
}

export default IntegerInput;
