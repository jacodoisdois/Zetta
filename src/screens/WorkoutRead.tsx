import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { workoutType } from '../types/Workout/WorkoutType';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteWorkoutById } from '../libs/SecureStore/Workout';

type WorkoutReadRouteParams = {
  workout?: workoutType;
  callBack?: () => void;
};

export default function WorkoutRead() {
  const route = useRoute();
  const { workout }: WorkoutReadRouteParams = route.params as WorkoutReadRouteParams;
  const navigation = useNavigation();

  const handleDeleteWorkout = async () => {
    await deleteWorkoutById(workout?.id || '');
    navigation.navigate('Workouts' as never);
  };

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>No workout data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workout - {workout.name}</Text>
      <View style={styles.exercisesContainer}>
        <Text style={styles.exercisesText}>Exercises:</Text>
        {workout.exercises.map((exercise, count) => (
          <Text key={count}>{`${count + 1} - ${exercise}`}</Text>
        ))}
      </View>
    </ScrollView>
      <View style={styles.actionsContainer}>
      <DefaultScreenButton buttonName="Delete" onPress={handleDeleteWorkout} color="#f83e3e" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
  },
  exercisesContainer: {
    marginLeft: 20,
    marginBottom: 20,
  },
  exercisesText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  timestamp: {
    fontStyle: 'italic',
    marginLeft: 20,
    fontSize: 12,
    alignSelf: 'flex-start'
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  }
});
