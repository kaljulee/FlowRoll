import React, { useState } from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, Radio } from 'native-base';
import { Gears } from '../../models/Gears';

function GearSelector(props) {
  const { gear, setGear } = props;
  const { NEUTRAL, FULL_CYCLE } = Gears;
  function onPressRadio(newGear) {
    setGear(newGear);
  }
  return (
    <Grid style={{ width: '100%' }}>
      <Row>
        <Col>
          <Text>Neutral</Text>
          <Radio
            onPress={() => onPressRadio(NEUTRAL)}
            selected={gear === NEUTRAL}
          />
        </Col>
        <Col>
          <Text>Full</Text>
          <Radio
            onPress={() => onPressRadio(FULL_CYCLE)}
            selected={gear === FULL_CYCLE}
          />
        </Col>
      </Row>
    </Grid>
  );
}

export default GearSelector;
