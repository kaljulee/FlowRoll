/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
///////////////////
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
import GroundRobin from './src/pages/GroundRobin';
import MainDisplay from './src/pages/MainDisplay';
import {
  Header,
  Body,
  Button,
  Icon,
  Left,
  Right,
  Title,
  Tab,
  Tabs,
} from 'native-base';
import ActiveTimerWarningModal from './src/components/modals/ActiveTimerWarningModal';
import TrainSchedule from './src/pages/TrainSchedule';
import NiceNav from './src/pages/NiceNav';
const { store, persistor } = configureStore();

const App: () => React$Node = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const hasHeader = false;

  function onReturnToTimerPress() {
    setCurrentTab(1);
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.SafeAreaView}>
            <View
              contentInsetAdjustmentBehavior="automatic"
              style={styles.View}>
              {hasHeader && (
                <Header hasTabs>
                  <Left>
                    <Button transparent>
                      <Icon name="menu" />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Header</Title>
                  </Body>
                  <Right />
                </Header>
              )}
              <Tabs
                locked={true}
                page={currentTab}
                onChangeTab={(page) => setCurrentTab(page.i)}>
                <Tab heading={'GroundRobin'}>
                  <GroundRobin />
                </Tab>
                <Tab heading={'NiceNav'}>
                  <NiceNav />
                </Tab>
                <Tab heading={'Train Schedule'}>
                  <TrainSchedule />
                </Tab>
              </Tabs>
              <ActiveTimerWarningModal
                onReturnToTimerPress={onReturnToTimerPress}
                currentTab={currentTab}
              />
            </View>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: { flex: 1 },
  View: {
    // borderWidth: 5,
    // borderColor: 'purple',
    flex: 1,
  },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  // body: {
  //   backgroundColor: Colors.white,
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default App;
