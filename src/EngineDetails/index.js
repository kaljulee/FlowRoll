import React from 'react';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { formatSecondsToDisplay } from '../helpers/time';
import { Text, Label } from 'native-base';

function EngineDetailRow(props) {
  const { label, info } = props;
  return (
    <Row style={{justifyContent: 'space-between', marginLeft: 3, marginRight: 3}}>
      <Label>{label}</Label>
      <Text>{`${info}`}</Text>
    </Row>
  );
}

function EngineDetails(props) {
  const {
    settings: { coolDown, warmUp, work, floorStates, name },
  } = props;

  if (name === 'ZERO') {
    return (
      <Grid>
        <Text>no engine loaded</Text>
      </Grid>
    );
  }

  const warmUpDisplay = formatSecondsToDisplay(warmUp);
  const workDisplay = formatSecondsToDisplay(work);
  const coolDownDisplay = formatSecondsToDisplay(coolDown);
  const floorStateDisplay = floorStates ? floorStates.length : 0;

  return (
    <Grid>
      <Col>
        <EngineDetailRow label={'warmup'} info={warmUpDisplay} />
        <EngineDetailRow label={'work'} info={workDisplay} />
        <EngineDetailRow label={'cooldown'} info={coolDownDisplay} />
      </Col>
      <Col>
        <EngineDetailRow label={'rounds'} info={floorStateDisplay} />
      </Col>
    </Grid>
  );
}

export default EngineDetails;
