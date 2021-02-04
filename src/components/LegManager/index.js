import React from 'react';
import ToggleList from '../ToggleList';

function LegManager(props) {
  const {
    available,
    schedule,
    onPressAvailableLeg,
    onPressActiveLeg,
    onLongPressActiveLeg,
    onLongPressAvailableLeg,
  } = props;

  return (
    <ToggleList
      available={available}
      active={schedule}
      onPressAvailable={onPressAvailableLeg}
      onLongPressAvailable={onLongPressAvailableLeg}
      onPressActive={onPressActiveLeg}
      onLongPressActive={onLongPressActiveLeg}
      activeHeader={'scheduled'}
      availableHeader={'available'}
    />
  );
}

export default LegManager;
