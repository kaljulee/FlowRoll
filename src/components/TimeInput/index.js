import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Text, Item, Input } from 'native-base';
import NumberInput from '../NumberInput';

function TimeInput(props) {
  const { label, value } = props;
  return (
    <Card style={{width: '100%', height: 'auto'}}>
      <CardItem header>
        <Text>{label}</Text>
      </CardItem>
      <CardItem style={{flexDirection: 'row', margin: 5}} cardBody>
        <Item style={{flex: 1}} underline>
          <NumberInput placeholder={'HH'} />
        </Item>
        <Item style={{flex: 1}} underline>
          <NumberInput placeholder={'MM'} />
        </Item>
        <Item style={{flex: 1}} underline>
          <NumberInput placeholder={'SS'} />
        </Item>
      </CardItem>
    </Card>
  );
}

export default TimeInput;
