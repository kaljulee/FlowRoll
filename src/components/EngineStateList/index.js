import React from 'react';
import { Text, H3 } from 'native-base';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { resetDB, setBreakTime, setRoundTime } from '../../actions';
import { createAndSetEngine } from '../../actions/thunks';
import { findMatchUpByID } from '../../helpers/utils';

function RenderItem(props) {
  const { p1, p2 } = props;
  return <H3 style={{ padding: 10 }}>{`${p1.label} and ${p2.label}`}</H3>;
}

function EngineStateList(props) {
  const { cycle, matchUps } = props;

  const simpleCycle = cycle.map(c => c[0]);
  function renderItem(id) {
    return RenderItem(findMatchUpByID(matchUps, id));
  }

  return (
    <FlatList
      data={simpleCycle}
      keyExtractor={(item) => item}
      renderItem={({ item }) => renderItem(item)}
    />
  );
}

const mapStateToProps = (state) => {
  const {
    groundRobin: {
      activeParticipants,
      matchUps,
      warmUp,
      coolDown,
      work,
      currentRound,
      estimatedTime,
      participants,
      roundCount,
      completeRRCycle,
    },
    navigation: { map, elapsedSeconds },
  } = state;
  return {
    matchUps,
    completeRRCycle,
    activeParticipants,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EngineStateList);
