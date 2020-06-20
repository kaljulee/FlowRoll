import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Text, Item, Input } from 'native-base';
import NumberInput from '../NumberInput';
import {numberInputFontSize} from '../../constants/styleValues';

function TimeInput(props) {
  const { label, value } = props;
  const styles = StyleSheet.create({
    container: { width: '100%', height: 'auto' },
    input: {
      flex: 2,
    },
    divider: {
      flex: 1,
    },
    dividerText: {
      fontSize: numberInputFontSize,
    },
  });
  // console.group('timeINput value');
  // console.log(value);
  // console.groupEnd();
  return (
    <Card style={styles.container}>
      <CardItem header>
        <Text>{label}</Text>
      </CardItem>
      <CardItem style={{ flexDirection: 'row', margin: 5 }} cardBody>
        <Item style={styles.input} underline>
          <NumberInput value={value.h} placeholder={'HH'} />
        </Item>
        <Text style={styles.dividerText}>:</Text>
        <Item style={styles.input} underline>
          <NumberInput value={value.m} placeholder={'MM'} />
        </Item>
        <Text style={styles.dividerText}>:</Text>
        <Item style={styles.input} underline>
          <NumberInput value={value.s} placeholder={'SS'} />
        </Item>
      </CardItem>
    </Card>
  );
}

export default TimeInput;
