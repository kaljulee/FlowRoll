import React, { useState } from 'react';
import Slider from '@react-native-community/slider';

const style = {
  width: '100%',
  height: 40,
  position: 'absolute',
  alignSelf: 'center',
};

const trackColors = {
  minimumTrackTintColor: 'pink',
  maximumTrackTintColor: 'purple',
};

function SecondSlider(props) {
  const { value, onValueChange, isVisible } = props;
  if (!isVisible) {
    return false;
  }
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
