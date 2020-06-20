import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';

function NumberInput(props) {
  const { placeholder, defaultValue } = props;
  const [currentValue, setCurrentValue] = useState(defaultValue);
  console.log('currentValue ' + currentValue);
  return (
    <Input
      onChangeText={(value) => {setCurrentValue(value)}}
      onEndEditing={(value) => {console.log('onEndEditing');console.log(value);}}
      maxLength={2}
      keyboardType={'number-pad'}
      placeholder={placeholder}
      value={currentValue}
      style={{ width: 50, height: 100, backgroundColor: 'yellow', fontSize: 30, }}
      textAlign={'center'}
    />
  );
}

export default NumberInput;
