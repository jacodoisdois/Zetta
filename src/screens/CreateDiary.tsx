import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CreateDiaryProps } from '../types/Navigation/DiaryNavigation';
import { retrieveData } from '../libs/SecureStore/General';
import { workoutType } from '../types/Workout/WorkoutType';
import { Picker } from '@react-native-picker/picker';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import InputExercise from '../components/InputExercise/InputExercise';
import { DiaryType, ExercisesWeightType } from '../types/Diary/DiaryType';
import { ScrollView } from 'react-native-gesture-handler';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';
import { formatDate } from '../utils/formatDate';
import { saveDiary } from '../libs/SecureStore/Diary';
import { LinearGradient } from 'expo-linear-gradient';

const CreateDiary = ({ navigation }: CreateDiaryProps) => {
  const [workouts, setWorkouts] = useState<Array<workoutType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState<workoutType>();
  const [exercisesWeight, setExercisesWeight] = useState<ExercisesWeightType[]>([]);

  useEffect(() => {
    handleFetchWorkouts();
    const unsubscribe = navigation.addListener("focus", handleFetchWorkouts);

    return unsubscribe;
  }, [navigation]);

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


  const handleSelectWorkout = async (workoutId: string) => {
    const foundWorkout = workouts.find((workout) => workout.id === workoutId);
    setSelectedWorkout(foundWorkout);

    if (foundWorkout) {
      const initialExercisesWeight: ExercisesWeightType[] = foundWorkout.exercises.map((exercise) => ({
        exercise,
        value: 0,
        unit: 'kg',
      }));
      setExercisesWeight(initialExercisesWeight);
    }
  };

  const handleSaveButtonPress = async () => {
    const date = new Date();
    const newDiary: DiaryType = {
      id: uuidv4(),
      createdAt: date,
      diaryDate: formatDate(date),
      workoutId: selectedWorkout?.id || '',
      exercises: exercisesWeight,
      workoutName: selectedWorkout?.name || '',
    };

    await saveDiary(newDiary);
    await setSelectedWorkout(undefined);
    await setExercisesWeight([]);

    navigation.goBack();
  };

  const handleAmountInputChange = (exercise: string, amount: number) => {
    const exerciseWeightIndex = exercisesWeight.findIndex((ew) => ew.exercise === exercise);

    if (exerciseWeightIndex !== -1) {
      const newExercisesWeight = [...exercisesWeight];
      newExercisesWeight[exerciseWeightIndex] = {
        ...newExercisesWeight[exerciseWeightIndex],
        value: amount,
      };
      setExercisesWeight(newExercisesWeight);
    } else {
      const newExerciseWeight: ExercisesWeightType = {
        exercise,
        value: amount,
        unit: 'kg',
      };
      setExercisesWeight((prevExercisesWeight) => [...prevExercisesWeight, newExerciseWeight]);
    }
  };


  const handleExerciseWeightChange = (exercise: string, value: number, unit: string) => {
    const newExercisesWeight = exercisesWeight.map((exerciseWeight) => {
      if (exerciseWeight.exercise === exercise) {
        return {
          ...exerciseWeight,
          value,
          unit,
        };
      }
      return exerciseWeight;
    });
    setExercisesWeight(newExercisesWeight);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>

        <ScrollView style={styles.contentContainer}>
          <Text style={styles.headerText}>Select a workout:</Text>
          <Picker
            selectedValue={selectedWorkout?.id}
            onValueChange={handleSelectWorkout}
            itemStyle={styles.pickerText}
            style={styles.picker}
          >
            {workouts.map((workout) => (
              <Picker.Item
                key={workout.id}
                label={`Workout - ${workout.name}`}
                value={workout.id}
              />
            ))}
          </Picker>
          <View>
          {
            selectedWorkout?.exercises.map((exercise: string) => {
              const exerciseWeight = exercisesWeight.find((ew) => ew.exercise === exercise);
              const currentAmount = exerciseWeight?.value || 0;
              return (
                <View style={styles.exerciseContainer} key={exercise}>
                  <Text style={styles.exerciseText}>{exercise}:</Text>
                  <InputExercise
                    placeholder='Amount'
                    onChangeText={(amount) => handleAmountInputChange(exercise, parseInt(amount))}
                    keyboardType='numeric'
                  />
                  <Picker
                    selectedValue={exerciseWeight?.unit || 'kg'}
                    onValueChange={(unit) => handleExerciseWeightChange(exercise, currentAmount, unit)}
                    style={styles.picker}
                    itemStyle={styles.pickerText}
                  >
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="minutes" value="minutes"/>
                  </Picker>
                </View>
              );
            })
          }
          </View>
          <View>
            <DefaultScreenButton buttonName="Save" onPress={handleSaveButtonPress} color='#1E90FF' />
          </View>
        </ScrollView>
        </LinearGradient>
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
    color: '#fafafa',
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  exerciseContainer: {
    justifyContent: 'space-evenly',
  },
  picker:{
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fafafa',
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#2283dddd',
  },
  exerciseText:{
    color: '#fafafa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerText: {
    color: '#fafafa',
  }
});

export default CreateDiary;
