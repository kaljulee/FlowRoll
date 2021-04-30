import React from 'react';
import ToggleList from '../../ToggleList';

function RouteManager(props) {
  const {
    available,
    schedule,
    onPressAvailableRoute,
    onPressActiveRoute,
    onLongPressActiveRoute,
    onLongPressAvailableRoute,
  } = props;

  return (
    <ToggleList
      available={available}
      active={schedule}
      onPressAvailable={onPressAvailableRoute}
      onLongPressAvailable={onLongPressAvailableRoute}
      onPressActive={onPressActiveRoute}
      onLongPressActive={onLongPressActiveRoute}
      activeHeader={'scheduled'}
      availableHeader={'available'}
    />
  );
}

export default RouteManager;
