import React from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { StyleSheet, Text } from 'react-native';
import SchedulingList from '../SchedulingList';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  item: { flex: 1, flexDirection: 'column', height: '100%' },
});

function ToggleList(props) {
  const {
    available,
    active,
    onPressAvailable,
    onPressActive,
    onLongPressAvailable,
    onLongPressActive,
    activeHeader,
    availableHeader,
  } = props;
  return (
    <Grid style={styles.container}>
      <Row style={{ height: '100%' }}>
        <Col style={styles.item}>
          <Text>{availableHeader || 'out'}</Text>
          <SchedulingList
            onLongPress={onLongPressAvailable}
            onPress={onPressAvailable}
            header={availableHeader}
            data={available}
          />
        </Col>
        <Col style={styles.item}>
          <Text>{activeHeader || 'in'}</Text>
          <SchedulingList
            onLongPress={onLongPressActive}
            onPress={onPressActive}
            header={activeHeader}
            data={active}
          />
        </Col>
      </Row>
    </Grid>
  );
}

export default ToggleList;
