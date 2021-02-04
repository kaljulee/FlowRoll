import React from 'react';
import ToggleList from '../ToggleList';

function LegManager(props) {
  const { available, scheduled } = props;

  const onPressAvailableLeg = () => {};
  const onLongPressAvailableLeg = () => {};
  const onPressScheduledLeg = () => {};

  const onLongPressScheduledLeg = () => {};

  return (
    <ToggleList
      available={available}
      active={scheduled}
      onPressAvailable={onPressAvailableLeg}
      onLongPressAvailable={onLongPressAvailableLeg}
      onPressActive={onPressScheduledLeg}
      onLongPressActive={onLongPressScheduledLeg}
      activeHeader={'scheduled'}
      availableHeader={'available'}
    />
  );
}

export default LegManager;
