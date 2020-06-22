import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Text, Item, Label } from 'native-base';
import NumberInput, { NumberInputLabel } from '../NumberInput';
import { numberInputFontSize } from '../../constants/styleValues';

function TimeInput(props) {
  const { label, value } = props;
  const styles = StyleSheet.create({
    container: { width: '100%', height: 'auto' },
    input: {
      flex: 2,
      height: 100,
    },
    divider: {
      flex: 1,
    },
    dividerText: {
      fontSize: numberInputFontSize,
    },
  });
  return (
    <Card style={styles.container}>
      <CardItem header>
        <Text>{label}</Text>
      </CardItem>
      <CardItem style={{ flexDirection: 'row', margin: 5 }} cardBody>
        <Item style={styles.input} underline stackedLabel>
          <NumberInputLabel>hours</NumberInputLabel>
          <NumberInput value={value.h} placeholder={'HH'} />
        </Item>
        <Text style={styles.dividerText}>:</Text>
        <Item style={styles.input} underline stackedLabel>
          <NumberInputLabel>minutes</NumberInputLabel>
          <NumberInput value={value.m} placeholder={'MM'} />
        </Item>
        <Text style={styles.dividerText}>:</Text>
        <Item
          style={ styles.input }
          underline
          stackedLabel>
          <NumberInputLabel>seconds</NumberInputLabel>
          <NumberInput value={value.s} placeholder={'SS'} />
        </Item>
      </CardItem>
    </Card>
  );
}

export default TimeInput;
