import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Button,
  Container,
  Card,
  CardItem,
  Footer,
  Radio,
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import WeightedColumns from '../../components/WeightedColumns';
import SecondSlider from '../../components/Inputs/SecondSlider';
import GroundTimeInput from '../../components/Mechanics/GroundTimeInput';

function ActivityOption(props) {
  const { label } = props;
  return (
    <View>
      <Radio />
      <Text>label</Text>
    </View>
  );
}

function ActivityLabel(props) {
  const { label, color } = props;
  return (
    <Button>
      <Text style={{ color }}>label</Text>
    </Button>
  );
}

function MatSetup(props) {
  return (
    <Grid style={{ backgroundColor: 'cadetblue' }}>
      <Row>
        <Text>matsetup</Text>
      </Row>
    </Grid>
  );
}

function RotationSetup(props) {
  return (
    <Grid style={{ backgroundColor: 'coral' }}>
      <Row>
        <Text>rotation setup</Text>
      </Row>
    </Grid>
  );
}

function OptionsBlock(props) {
  const optionData = [{ label: 'round robin' }, { label: 'rotate through' }];

  const optionColumns = optionData.map((data, i) => {
    return (
      <Col key={i}>
        <ActivityOption label={data.label} />
      </Col>
    );
  });

  return (
    <Grid style={{ backgroundColor: 'purple' }}>
      <Row>{optionColumns}</Row>
      <Row>
        <Text>Total time</Text>
      </Row>
    </Grid>
  );
}

function ScheduleControls(props) {
  const onRadioPress = (viewType) => {
    console.log('viewType changed to ' + viewType);
  };

  function setPhaseTimes(arg) {
    console.log('trying to set phase times from slider');
    console.log(arg);
  }

  return (
    <Grid>
      <Row style={{ justifyContent: 'center' }}>
        <ActivityLabel label={'label'} color={'red'} />
      </Row>
      <Row>
        <MatSetup />
      </Row>
      <Row>
        <RotationSetup />
      </Row>
      <Row>
        <GroundTimeInput
          setPhaseTimes={setPhaseTimes}
          work={30}
          warmUp={5}
          coolDown={0}
        />
      </Row>
      <Row>
        <Button>
          <Text>Shrink / Fill</Text>
        </Button>
      </Row>
      <Row>
        <Text>Estimated End Time</Text>
      </Row>
    </Grid>
  );
}

function ScheduleOverview(props) {
  return (
    <Grid>
      <Row>
        <Text>view type radio buttons</Text>
      </Row>
      <Row>
        <Text>activity list</Text>
      </Row>
      <Row>
        <Text>total time</Text>
      </Row>
    </Grid>
  );
}

function TrainScheduler(props) {
  const colOne = <ScheduleControls />;
  const colTwo = <ScheduleOverview />;
  return (
    <Container>
      <WeightedColumns colOne={colOne} colTwo={colTwo} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {};
};

TrainScheduler.defaultProps = {};

export default connect(
  mapStateToProps,
  mapStateToProps,
)(TrainScheduler);
