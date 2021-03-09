import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Card, CardItem, Button, Text } from 'native-base';

function onCancelPress(args) {
  console.log('pressed cancel');
}

function ActiveTimerWarningModal(props) {
  const { currentTab, onReturnToTimerPress } = props;
  const isVisible = false;//currentTab !== 1 && status !== STATUS.IDLE;
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

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveTimerWarningModal);
