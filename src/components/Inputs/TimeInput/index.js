import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardItem, Text, Item, Label, Picker } from 'native-base';
import { NumberInputLabel } from '../../NumberInput';
import { numberInputFontSize } from '../../../constants/styleValues';

function TimeInput(props) {
  const { label, value, reduxAction, onSelectedChange } = props;
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

  const [selected, _setSelected] = useState({ h: 0, m: 0, s: 0 });

  function setSelected(type, update) {
    const hms = { ...selected };
    hms[type] = update;
    if (onSelectedChange) {
      onSelectedChange(hms);
    }
    _setSelected(hms);
  }
  const oneThroughTwelve = [];
  const oneThroughSixty = [];

  function createPickerItem(index) {
    return <Picker.Item label={`${index}`} value={index} key={`key${index}`} />;
  }

  for (let i = 1; i < 61; i += 1) {
    if (i < 13) {
      oneThroughTwelve.push(createPickerItem(i));
    }
    oneThroughSixty.push(createPickerItem(i));
  }

  return (
    <Card style={styles.container}>
      <CardItem header>
        <Text>{label}</Text>
      </CardItem>
      <CardItem style={{ flexDirection: 'row', margin: 5 }} cardBody>
        <Item style={styles.input} underline stackedLabel>
          <NumberInputLabel>hours</NumberInputLabel>
          <Picker
            style={{ width: 120 }}
            selectedValue={selected.h}
            onValueChange={(h) => setSelected('h', h)}>
            {oneThroughTwelve}
          </Picker>
        </Item>
        <Text style={styles.dividerText}>:</Text>
        <Item style={styles.input} underline stackedLabel>
          <NumberInputLabel>minutes</NumberInputLabel>
          <Picker
            style={{ width: 120 }}
            selectedValue={selected.m}
            onValueChange={(m) => setSelected('m', m)}>
            {oneThroughSixty}
          </Picker>
        </Item>
        <Text style={styles.dividerText}>:</Text>
        <Item style={styles.input} underline stackedLabel>
          <NumberInputLabel>seconds</NumberInputLabel>
          <Picker
            style={{ width: 120 }}
            selectedValue={selected.s}
            onValueChange={(s) => setSelected('s', s)}>
            {oneThroughSixty}
          </Picker>
        </Item>
      </CardItem>
    </Card>
  );
}

export default TimeInput;
