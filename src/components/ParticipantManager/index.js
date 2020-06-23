import React from 'react';
import { Grid, Col } from 'react-native-easy-grid';
import { StyleSheet, Text } from 'react-native';
import ParticipantList from '../ParticipantList';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: '100%',
  },
  item: { flex: 1, flexDirection: 'column' },
});

function ParticipantManager(props) {
  const { participants } = props;
  return (
    <Grid style={styles.container}>
      <Col style={styles.item}>
        <Text>out</Text>
        <ParticipantList header={'out'} participants={participants} />
      </Col>
      <Col style={styles.item}>
        <Text>in</Text>
        <ParticipantList header={'in'} participants={undefined} />
      </Col>
    </Grid>
  );
}

export default ParticipantManager;
