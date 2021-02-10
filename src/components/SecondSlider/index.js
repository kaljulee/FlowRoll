import React, { useState } from 'react';
import _ from 'lodash';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

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
  const { seconds, onValueChange, isVisible, secondsByValue } = props;
  if (!isVisible) {
    return false;
  }

  return (
    <Slider
      step={1}
      style={style}
      minimumTrackTintColor={trackColors.minimumTrackTintColor}
      maximumTrackTintColor={trackColors.maximumTrackTintColor}
      minimumValue={0}
      maximumValue={29}
      onValueChange={(v) => {
        onValueChange(secondsByValue[v]);
      }}
      value={_.indexOf(secondsByValue, seconds)}
    />
  );
}

const mapStateToProps = (state) => {
  const {
    secondSliderConverter: { secondsByValue },
  } = state.basicReducer;
  return { secondsByValue };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecondSlider);
