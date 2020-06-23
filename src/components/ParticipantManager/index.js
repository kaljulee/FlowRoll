import React from 'react';
import { Grid, Col } from 'react-native-easy-grid';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { participantsByActive } from '../../helpers/ordering';
import ParticipantList from '../ParticipantList';
import {
  activateParticipants,
  deactivateParticipants,
  addParticipants,
} from '../../actions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: '100%',
  },
  item: { flex: 1, flexDirection: 'column' },
});

function ParticipantManager(props) {
  const {
    participants,
    activeParticipants,
    addParticipants,
    activateParticipants,
    deactivateParticipants,
  } = props;

  const { available, active } = participantsByActive(
    participants,
    activeParticipants,
  );

  return (
    <Grid style={styles.container}>
      <Col style={styles.item}>
        <Text>out</Text>
        <ParticipantList
          onParticipantPress={(id) => activateParticipants([id])}
          header={'out'}
          participants={available}
        />
      </Col>
      <Col style={styles.item}>
        <Text>in</Text>
        <ParticipantList
          onParticipantPress={(id) => deactivateParticipants([id])}
          header={'in'}
          participants={active}
        />
      </Col>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  const {
    basicReducer: { participants, activeParticipants },
  } = state;
  return {
    participants,
    activeParticipants,
  };
};

const mapDispatchToProps = {
  activateParticipants,
  deactivateParticipants,
  addParticipants,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParticipantManager);
