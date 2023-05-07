import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AddAbsoluteButton from '../components/AddAbsoluteButton/AddAbsoluteButton';
import { retrieveData } from '../libs/SecureStore/Workout';

const Workouts = () => {
  return (
    <View style={styles.container}>
      <View><Text>Test</Text></View>
      <AddAbsoluteButton screenName="CreateWorkout" />
      <Button title="Test" onPress={() => retrieveData('workouts')} />
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
