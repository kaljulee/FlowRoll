import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Input, Label } from 'native-base';
import { numberInputFontSize } from '../../constants/styleValues';

function formatValueForInput(value) {
  const stringValue = value.toString();
  if (stringValue.length > 1) {
    return stringValue;
  }
  return `0${stringValue}`;
}

function NumberInput(props) {
  const { placeholder, value } = props;
  const [currentValue, setCurrentValue] = useState(formatValueForInput(value));
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
        fontSize: numberInputFontSize,
      }}
      textAlign={'center'}
    />
  );
}

export function NumberInputLabel(props) {
  return (
    <Label style={{ fontSize: 10, textAlign: 'right', marginRight: 'auto' }}>
      {props.children}
    </Label>
  );
}

export default NumberInput;
