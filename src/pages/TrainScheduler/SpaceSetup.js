import { Grid, Row } from 'react-native-easy-grid';
import { Text } from 'native-base';
import React from 'react';

function SpaceSetup(props) {
  return (
    <Grid style={{ backgroundColor: 'cadetblue' }}>
      <Row>
        <Text>spacesetup</Text>
      </Row>
    </Grid>
  );
}

export default SpaceSetup;
