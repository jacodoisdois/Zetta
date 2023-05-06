import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddAbsoluteButton from '../components/AddAbsoluteButton/AddAbsoluteButton';

const Workouts = () => {
  return (
    <View style={styles.container}>
      <View><Text>Test</Text></View>
      <AddAbsoluteButton screenName="CreateWorkout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Workouts;
