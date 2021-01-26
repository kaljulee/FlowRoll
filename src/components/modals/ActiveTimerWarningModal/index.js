import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Card, CardItem, Button, Text } from 'native-base';
import { STATUS } from '../../../helpers/utils';

function onCancelPress(args) {
  console.log('pressed cancel');
}

function ActiveTimerWarningModal(props) {
  const { currentTab, status, onReturnToTimerPress } = props;
  console.log(currentTab);
  const isVisible = currentTab !== 1 && status !== STATUS.IDLE;
  return (
    <Modal isVisible={isVisible}>
      <Card>
        <CardItem style={{ display: 'flex', flexDirection: 'column' }}>
          <Text>Timer is Active</Text>
          <Button warning onPress={onCancelPress}>
            <Text>Cancel Timer?</Text>
          </Button>
          <Button onPress={onReturnToTimerPress}>
            <Text>{'Return To Timer'}</Text>
          </Button>
          <Text>Remaining Time</Text>
          <Text>{''}</Text>
        </CardItem>
      </Card>
    </Modal>
  );
}

const mapStateToProps = (state) => ({ status: state.basicReducer.status });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveTimerWarningModal);
