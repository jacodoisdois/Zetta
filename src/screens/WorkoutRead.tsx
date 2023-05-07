import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { workoutType } from '../types/Workout/WorkoutType';
import moment from 'moment';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteWorkoutById } from '../libs/SecureStore/Workout';

type WorkoutReadRouteParams = {
  workout?: workoutType;
  callBack: () => void;
};

export default function WorkoutRead() {
  const route = useRoute();
  const { workout, callBack }: WorkoutReadRouteParams = route.params as WorkoutReadRouteParams;
  const navigation = useNavigation();

  const handleDeleteWorkout = async () => {
    await deleteWorkoutById(workout?.id || '');
    callBack();
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      {workout.exercises.map((exercise, count) => (
        <Text key={count}>{`${count + 1} - ${exercise}`}</Text>
      ))}
      <Text>{moment(workout.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
      <DefaultScreenButton buttonName="Delete" onPress={handleDeleteWorkout} color="#f83e3e" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    position: 'absolute',
    top: 50,
  },
});
