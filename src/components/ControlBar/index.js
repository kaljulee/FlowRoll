import React from 'react';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 25,
    color: 'white',
  },
});

function ControlBar(props) {
  const { onPressPlay, onPressPause, onPressRestart } = props;
  return (
    <Grid>
      <Col>
        <Button onPress={onPressPlay} style={styles.button} iconLeft>
          <Icon style={styles.icon} name={'controller-play'} />
        </Button>
      </Col>
      <Col>
        <Button onPress={onPressPause} style={styles.button}>
          <Icon style={styles.icon} name={'controller-paus'} />
        </Button>
      </Col>
      <Col>
        <Button onPress={onPressRestart} style={styles.button} iconRight>
          <FAIcon style={styles.icon} name={'undo'} />
        </Button>
      </Col>
    </Grid>
  );
}

export default ControlBar;
