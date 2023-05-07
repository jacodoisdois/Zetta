import * as SecureStore from 'expo-secure-store';
import { workoutType } from '../../types/Workout/WorkoutType';


export const retrieveData = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      console.log('Retrieved value:', value);
      return value;
    } else {
      console.log('Value not found.');
      return null;
    }
  } catch (error) {
    console.log('Error retrieving value:', error);
    return null;
  }
};

export const addNewWorkout = async (workout: workoutType): Promise<void> => {
  try {
    const workouts: string | null = await retrieveData('workouts');
    const workoutsArray: workoutType[] = workouts ? JSON.parse(workouts) : [];
    workoutsArray.push(workout);
    const workoutString = JSON.stringify(workoutsArray);
    await SecureStore.setItemAsync('workouts', workoutString);
  } catch (error) {
    console.log('Error saving workout:', error);
  }
};


export const findWorkoutById = async (id: string): Promise<workoutType | null> => {
  try {
    const workouts: string | null = await retrieveData('workouts');
    const workout: workoutType = workouts ? JSON.parse(workouts).find((workout: workoutType) => workout.id === id) : null;

    if(workout){
      return workout;
    } else {
      console.log('Workout not found.');
      return null;
    }

  }catch(error){
    console.log('Error finding workout:', error);
    return null;
  }
};

export const deleteWorkoutById = async (id: string): Promise<void> => {
  try {
    const workouts: string | null = await retrieveData('workouts');
    const workoutsArray: workoutType[] = workouts ? JSON.parse(workouts) : [];
    const newWorkoutsArray = workoutsArray.filter((workout: workoutType) => workout.id !== id);
    const workoutString = JSON.stringify(newWorkoutsArray);
    await SecureStore.setItemAsync('workouts', workoutString);
  } catch (error) {
    console.log('Error deleting workout:', error);
  }
};
