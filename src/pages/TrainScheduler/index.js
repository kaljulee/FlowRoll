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
import TimeSetup from './TimeSetup';
import SpaceSetup from './SpaceSetup';

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

  return (
    <Grid>
      <Row size={1} style={{ justifyContent: 'center' }}>
        <ActivityLabel label={'label'} color={'red'} />
      </Row>
      <Row size={2}>
        <SpaceSetup />
      </Row>
      <Row size={2}>
        <TimeSetup />
      </Row>
      <Row size={1}>
        <Button>
          <Text>Shrink / Fill</Text>
        </Button>
      </Row>
      <Row size={1}>
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
