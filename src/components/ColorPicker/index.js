import React from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { COLORS } from '../../constants/styleValues';

function ColorPicker(props) {
  const { isVisible, onColorPress } = props;
  if (!isVisible) {
    return false;
  }
  return (
    <Grid>
      {Object.values(COLORS).map((c, i) => {
        return (
          <Row
            key={c}
            onPress={() => onColorPress(c)}
            style={{
              width: '100%',
              backgroundColor: c,
            }}
          />
        );
      })}
    </Grid>
  );
}

export default ColorPicker;
