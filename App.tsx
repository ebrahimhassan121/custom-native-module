/* eslint-disable react-hooks/exhaustive-deps */
/**
 * this task is a simple native module and send native event based on interval
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import CustomModule, {EVENTMETADATA} from './src/native/custom-module';

const defaultResponse: EVENTMETADATA = {
  seconds: 0,
  name: '',
  title: '',
};

const App = () => {
  const event = useRef<CustomModule>(
    new CustomModule(1000, {
      name: 'John dooo',
      title: 'software developer',
    }),
  ).current;

  const [response, setResonse] = useState<EVENTMETADATA>(defaultResponse);

  useEffect(() => {
    return handleStopEvent;
  }, []);

  const onChange = useCallback((data: EVENTMETADATA) => {
    setResonse(data);
  }, []);

  const handleStartEvent = () => {
    event.startEvent(onChange);
  };

  const handleStopEvent = () => {
    event.stopEvent();
    setResonse(defaultResponse);
  };

  return (
    <SafeAreaView>
      <View style={styles.Container}>
        <Button title="Start Event" onPress={handleStartEvent} />
        <Text>Data: {JSON.stringify(response)}</Text>
        <Button title="Stop Event" onPress={handleStopEvent} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    padding: 8,
  },
});

export default App;
