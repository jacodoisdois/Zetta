import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationProps } from '../types/Navigation/DiaryNavigation';
import { retrieveData } from '../libs/SecureStore/Workout';
import { workoutType } from '../types/Workout/WorkoutType';
import { Picker } from '@react-native-picker/picker';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import InputExercise from '../components/InputExercise/InputExercise';

const CreateDiary = ({ navigation }: NavigationProps) => {
  const [workouts, setWorkouts] = useState<Array<workoutType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState<workoutType>();

  const handleFetchWorkouts = async () => {
    try {
      const workoutString = await retrieveData('workouts');
      const workouts = workoutString ? JSON.parse(workoutString) : [];
      setWorkouts(workouts);
    } catch (error) {
      console.log('Error fetching workouts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWorkouts();

    const unsubscribe = navigation.addListener('focus', handleFetchWorkouts);
    return unsubscribe;
  }, [navigation]);

  const handleSelectWorkout = async (workoutId: string) => {
    const foundWorkout = workouts.find((workout) => workout.id === workoutId);
    setSelectedWorkout(foundWorkout);
  };

  const [selectedUnit, setSelectedUnit] = useState<string>('kg');
  const handleSelectUnit = (unit: string) => {
    setSelectedUnit(unit);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Select a workout:</Text>
          <Picker
            selectedValue={selectedWorkout?.id}
            onValueChange={handleSelectWorkout}
          >
            <Picker.Item />
            {workouts.map((workout) => (
              <Picker.Item
                key={workout.id}
                label={workout.name}
                value={workout.id}
              />
            ))}
          </Picker>
          <View>
          {
            selectedWorkout?.exercises.map((exercise: string) => (
              <View style={styles.exerciseContainer} key={exercise}>
                <Text>{exercise}:</Text>
                <InputExercise placeholder='Amount' onChangeText={() => console.log('Change')} />
                 <Picker
                  selectedValue={selectedUnit}
                  onValueChange={(unit) => setSelectedUnit(unit)}
                >
                  <Picker.Item label="kg" value="kg" />
                  <Picker.Item label="lbs" value="lbs" />
                  <Picker.Item label="minutes" value="minutes" />
                </Picker>
              </View>
            ))
          }
          </View>
          <View>
            <DefaultScreenButton buttonName="Save" onPress={() => console.log('Add')} color='#1E90FF' />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 15,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  exerciseContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
  }
});

export default CreateDiary;
