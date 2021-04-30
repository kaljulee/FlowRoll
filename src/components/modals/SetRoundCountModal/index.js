import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Card, Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';
import CloseModalButton from '../../CloseModalButton';
import { numberInputFontSize } from '../../../constants/styleValues';
import { NumberInputLabel } from '../../Inputs/NumberInput';
import { setRoundCount } from '../../../actions';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
  },
  input: {
    height: 100,
    width: 200,
    fontSize: numberInputFontSize,
    textAlign: 'center',
  },
});

function SetRoundCountModal(props) {
  const { isVisible, onClosePress, label, setRoundCount } = props;
  const [value, _setValue] = useState(props.value.toString());
  const setValue = (v) => {
    _setValue(v);
    setRoundCount(v);
  };
  return (
    <Modal isVisible={isVisible}>
      <Card style={styles.card}>
        <Item stackedLabel>
          <NumberInputLabel>rounds</NumberInputLabel>
          <Input
            style={styles.input}
            onChangeText={(newValue) => {
              setValue(newValue);
            }}
            onEndEditing={(newValue) => {
              console.log('done editing');
            }}
            keyboardType={'number-pad'}
            value={value}
            label={label}
          />
        </Item>
      </Card>
      <CloseModalButton onPress={onClosePress} />
    </Modal>
  );
}

SetRoundCountModal.defaultProps = {
  label: 'rounds',
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setRoundCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetRoundCountModal);
