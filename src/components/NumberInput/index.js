import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';
import { numberInputFontSize } from '../../constants/styleValues';

function NumberInput(props) {
  const { placeholder, value } = props;
  const [currentValue, setCurrentValue] = useState(value.toString());
  // console.group('number input');
  // console.log('recd ' + value);
  // console.log('current: ' + currentValue);
  // console.groupEnd();
  return (
    <Input
      onChangeText={(newValue) => {
        setCurrentValue(newValue);
      }}
      onEndEditing={(newValue) => {
        console.log('onEndEditing');
        console.log(newValue);
      }}
      maxLength={2}
      keyboardType={'number-pad'}
      placeholder={placeholder}
      value={currentValue}
      style={{
        width: 50,
        height: 100,
        fontSize: numberInputFontSize,
      }}
      textAlign={'center'}
    />
  );
}

export default NumberInput;
