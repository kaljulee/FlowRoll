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
import TimerSetup from './src/pages/TimerSetup';
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
import TimeKeeperContainer from './src/components/TimeKeeperContainer';
import ActiveTimerWarningModal from './src/components/modals/ActiveTimerWarningModal';
import TrainSchedule from './src/pages/TrainSchedule';

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
              <TimeKeeperContainer>
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
                  page={currentTab}
                  onChangeTab={(page) => setCurrentTab(page.i)}>
                  <Tab heading={'setup'}>
                    <TimerSetup
                      currentTab={currentTab}
                      changeTab={(page) => setCurrentTab(page)}
                    />
                  </Tab>
                  <Tab heading={'timer'}>
                    <MainDisplay
                      onPressRestart={() =>
                        console.log('missing restart function at APP level')
                      }
                    />
                  </Tab>
                  <Tab heading={'train schedule'}>
                    <TrainSchedule />
                  </Tab>
                </Tabs>
                <ActiveTimerWarningModal
                  onReturnToTimerPress={onReturnToTimerPress}
                  currentTab={currentTab}
                />
              </TimeKeeperContainer>
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
