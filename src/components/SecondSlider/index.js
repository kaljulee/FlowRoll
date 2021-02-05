import React, { useState } from 'react';
import Slider from '@react-native-community/slider';

const style = {
  width: 200,
  height: 40,
};

const trackColors = {
  minimumTrackTintColor: 'pink',
  maximumTrackTintColor: 'purple',
};

function SecondSlider(props) {
  const { value, onValueChange } = props;

  return (
    <Slider
      step={10}
      style={style}
      minimumTrackTintColor={trackColors.minimumTrackTintColor}
      maximumTrackTintColor={trackColors.maximumTrackTintColor}
      minimumValue={0}
      maximumValue={3600}
      onValueChange={onValueChange}
      value={value}
    />
  );
}

export default SecondSlider;
