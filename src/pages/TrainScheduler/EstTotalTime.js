import { Text } from 'native-base';
import { Row } from 'react-native-easy-grid';
import React from 'react';

export const MODES = {
  END_TIME: 'END_TIME',
  DURATION: 'DURATION',
};

function EstTotalTime(props) {
  const { mode } = props;
  return <Text style={{ textAlign: 'center' }}>{`Est mode ${mode}`}</Text>;
}

EstTotalTime.defaultProps = { mode: MODES.DURATION };

export default EstTotalTime;
