import { Grid, Row } from 'react-native-easy-grid';
import { Text, Picker } from 'native-base';
import React from 'react';
import GroundTimeInput from '../../components/Mechanics/GroundTimeInput';

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
