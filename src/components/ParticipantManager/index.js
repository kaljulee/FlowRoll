import React from 'react';
import { connect } from 'react-redux';
import { participantsByActive } from '../../helpers/ordering';
import {
  activateParticipants,
  deactivateParticipants,
  addParticipants,
} from '../../actions';
import ToggleList from '../ToggleList';

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
    groundRobin: { participants, activeParticipants },
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
