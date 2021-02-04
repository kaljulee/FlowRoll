import React from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { participantsByActive } from '../../helpers/ordering';
import ParticipantList from '../ParticipantList';
import {
  activateParticipants,
  deactivateParticipants,
  addParticipants,
} from '../../actions';
import ToggleList from '../ScheduleManager/ToggleList';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  item: { flex: 1, flexDirection: 'column', height: '100%' },
});

function ParticipantManager(props) {
  const {
    participants,
    activeParticipants,
    addParticipants,
    activateParticipants,
    deactivateParticipants,
    onLongPressParticipant,
  } = props;

  const { available, active } = participantsByActive(
    participants,
    activeParticipants,
  );

  return (
    <ToggleList
      available={available}
      active={active}
      onPressAvailable={(id) => activateParticipants([id])}
      onLongPressAvailable={(id) => onLongPressParticipant(id)}
      onPressActive={(id) => deactivateParticipants([id])}
      onLongPressActive={(id) => onLongPressParticipant(id)}
      activeHeader={'in'}
      availableHeader={'out'}
    />
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
