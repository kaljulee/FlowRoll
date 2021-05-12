import { Grid, Row } from 'react-native-easy-grid';
import React, { useState } from 'react';
import SettingsButton from '../../components/Inputs/SettingsButton';
import ManageParticipantsModal from '../../components/modals/ManageParticipantsModal';
import AddParticipantModal from '../../components/modals/AddParticipantModal';
import DeleteParticipantModal from '../../components/modals/DeleteParticipantModal';
import IntegerInput from './IntegerInput';

function SpaceSetup(props) {
  const { activeParticipants, participants } = props;

  const [showParticipantInput, setShowParticipantInput] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showDeleteParticipant, setShowDeleteParticipant] = useState(false);

  const rowStyle = {
    justifyContent: 'center',
    alignContent: 'center',
  };

  return (
    <Grid style={{ backgroundColor: 'cadetblue', padding: 5 }}>
      <Row style={rowStyle}>
        <SettingsButton
          label={'Set Players'}
          info={activeParticipants.length}
          onPress={() => setShowParticipantInput(true)}
        />
      </Row>
      <Row style={rowStyle}>
        <IntegerInput value={1} label={'spaces'} />
      </Row>
      <Row style={rowStyle}>
        <IntegerInput value={2} label={'peeps per space'} />
      </Row>
      <ManageParticipantsModal
        onLongPressParticipant={setShowDeleteParticipant}
        participants={participants}
        isVisible={showParticipantInput}
        onClosePress={() => setShowParticipantInput(false)}
        onAddParticipantPress={() => {
          console.log('partic? ' + !showAddParticipant);
          setShowAddParticipant(true);
        }}
      />
      <AddParticipantModal
        isVisible={showAddParticipant}
        closeModal={() => setShowAddParticipant(false)}
      />
      <DeleteParticipantModal
        setShowDeleteParticipant={setShowDeleteParticipant}
        deletableParticipant={showDeleteParticipant}
        closeModal={() => setShowDeleteParticipant(null)}
      />
    </Grid>
  );
}

SpaceSetup.defaultProps = {
  participants: [],
  activeParticipants: [],
};

export default SpaceSetup;
