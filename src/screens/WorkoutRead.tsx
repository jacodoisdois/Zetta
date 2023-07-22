import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { workoutType } from '../types/Workout/WorkoutType';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteWorkoutById } from '../libs/SecureStore/Workout';
import { LinearGradient } from "expo-linear-gradient";

type WorkoutReadRouteParams = {
  workout?: workoutType;
  callBack?: () => void;
};

export default function WorkoutRead() {
  const route = useRoute();
  const { workout }: WorkoutReadRouteParams = route.params as WorkoutReadRouteParams;
  const navigator = useNavigation();

  const handleDeleteWorkout = async () => {
    await deleteWorkoutById(workout?.id || '');
    navigator.navigate('Workouts' as never);
  };

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>No workout data available</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, styles.defaultFont]}>Workout - {workout.name}</Text>
      <View style={styles.contentContainer}>
        <View>
          <Text style={[styles.subtitle, styles.defaultFont]}>Description: </Text>
        <Text style={[styles.descriptionText, styles.defaultFont]}>
        {workout.description}</Text>
        </View>
      <View>
        <Text style={[styles.subtitle, styles.defaultFont]}>Target muscles: </Text>
        {workout.targetMuscles.map((muscle, count) => (
          <Text style={styles.defaultFont} key={count}>{`${count + 1} - ${muscle}`}</Text>
        ))}
      </View>
      <View style={styles.exercisesContainer}>
        <Text style={[styles.subtitle, styles.defaultFont]}>Exercises:</Text>
        {workout.exercises.map((exercise, count) => (
          <Text style={styles.defaultFont} key={count}>{`${count + 1} - ${exercise}`}</Text>
        ))}
      </View>
      </View>
    </ScrollView>
      <View style={styles.actionsContainer}>
      <DefaultScreenButton buttonName="Delete" onPress={handleDeleteWorkout} color="#e74c3c" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#33333'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
    alignSelf: 'center'
  },
  exercisesContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  contentContainer:{
    marginLeft: 20
  },
  descriptionText:{

  },
  defaultFont:{
    color: '#fafafa'
  }
});
