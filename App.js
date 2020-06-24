/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

const { store, persistor } = configureStore();

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <TimeKeeperContainer>
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
                <Tabs>
                  <Tab heading={'setup'}>
                    <TimerSetup />
                  </Tab>
                  <Tab heading={'timer'}>
                    <MainDisplay />
                  </Tab>
                </Tabs>
              </TimeKeeperContainer>
            </ScrollView>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
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
