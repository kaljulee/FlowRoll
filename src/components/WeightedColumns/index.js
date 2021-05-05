import React, { useState, useEffect } from 'react';
import { Text, Button, Container, Card, CardItem, Footer } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';

function WeightedColumns(props) {
  const { colOne, colTwo, active, ratio } = props;
  const [firstColWeight, setFirstColWeight] = useState(1);
  const [secondColWeight, setSecondColWeight] = useState(1);

  // todo disabling this for now, but will probably want to return to it in the future
  // useEffect(() => {
  //   if (!ratio) {
  //     return;
  //   }
  //   if (active === 1) {
  //     setFirstColWeight(ratio.active);
  //     setSecondColWeight(ratio.inactive);
  //   } else {
  //     setFirstColWeight(ratio.inactive);
  //     setSecondColWeight(ratio.active);
  //   }
  // }, [active, ratio]);

  return (
    <Grid>
      <Col size={firstColWeight}>{colOne}</Col>
      <Col size={secondColWeight}>{colTwo}</Col>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {};
};

WeightedColumns.defaultProps = {};

export default connect(
  mapStateToProps,
  mapStateToProps,
)(WeightedColumns);
