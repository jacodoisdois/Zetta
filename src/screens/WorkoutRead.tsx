import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { workoutType } from '../types/Workout/WorkoutType';
import moment from 'moment';

export default function WorkoutRead() {
  const route = useRoute();
  const { workout }: { workout?: workoutType } = route.params ?? {};

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>No workout data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Workout Read Screen</Text>
      <Text>{workout.name}</Text>
      {workout.exercises.map((exercise, count) => (
        <Text key={count}>{`${count + 1} - ${exercise}`}</Text>
      ))}
      <Text>{moment(workout.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
