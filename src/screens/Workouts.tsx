import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, ScrollView } from 'react-native';
import AddAbsoluteButton from '../components/AddAbsoluteButton/AddAbsoluteButton';
import { retrieveData } from '../libs/SecureStore/Workout';
import { LinearGradient } from 'expo-linear-gradient';
import { workoutType } from '../types/Workout/WorkoutType';
import WorkoutItem from '../components/WorkoutItem/WorkoutItem';

const Workouts = () => {
  const [workouts, setWorkouts] = useState<workoutType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateWorkouts = async () => {
    try {
      const workoutString = await retrieveData('workouts');
      const workouts = workoutString ? JSON.parse(workoutString) : [];
      setWorkouts(workouts);
      console.log('Workouts:', workouts);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        handleUpdateWorkouts();
      } catch (error) {
        console.log('Error fetching workouts:', error);
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          workouts.map((workout) => <WorkoutItem key={workout.id} workout={workout} callBack={handleUpdateWorkouts} />)
        )}
      </ScrollView>
      <AddAbsoluteButton screenName="CreateWorkout"  callBack={handleUpdateWorkouts}/>
    </LinearGradient>
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
