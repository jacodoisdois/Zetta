import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputExercise from '../components/InputExercise/InputExercise';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';
import { workoutType } from '../types/Workout/WorkoutType';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';
import { useNavigation } from '@react-navigation/native';
import { addNewWorkout } from '../libs/SecureStore/Workout';
import { ScrollView } from 'react-native-gesture-handler';

const CreateWorkout: React.FC = () => {
  const [inputExercises, setInputExercises] = useState<{ [key: string]: string }>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [exercises, setExercises] = useState<string[]>([]);
  const [workoutName, setWorkoutName] = useState<string>('');
  const navigation = useNavigation();


  const handleInputExerciseChange = (inputName: string,exerciseName:string) => {
    setInputExercises((prevInputValues) => ({ ...prevInputValues, [inputName]: exerciseName }));
  };

  const handleSaveWorkout = async () => {
    const nonEmptyInputs = Object.values(inputExercises).filter((value) => value.trim() !== '');
    setExercises(nonEmptyInputs);

    const workout : workoutType = {
      id: uuidv4(),
      name: workoutName,
      exercises: nonEmptyInputs,
      createdAt: new Date(),
    };
    await addNewWorkout(workout);
    setInputExercises({});
    navigation.goBack();
  };

  const handleAddInput = () => {
    const inputCount = Object.keys(inputExercises).length;
    const newInputName = `input${inputCount + 1}`;
    setInputExercises((prevInputValues) => ({ ...prevInputValues, [newInputName]: '' }));
  };

  return (
    <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>
      <View>
        <Text style={styles.headerText}>Create a new Workout!</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentHeaderText}>Workout Name:</Text>
        <InputExercise placeholder='Set the workout name' onChangeText={setWorkoutName} />

          <Text style={styles.contentHeaderText}>Exercises:</Text>

          <View style={styles.scrollViewContainer}>
            <ScrollView  contentInset={{bottom: Object.keys(inputExercises).length * 20}}>
            {Object.entries(inputExercises).map(([name]) => (
              <InputExercise
                key={name}
                placeholder={`Exercise ${name.substring(5)}`}
                onChangeText={(text) => { if(text && text !== '') handleInputExerciseChange(name, text)}}
              />
            ))}
            <View style={styles.buttonContainer}>
            <DefaultScreenButton buttonName="Create" onPress={handleSaveWorkout} color='#1E90FF' />
            <DefaultScreenButton buttonName="Add Input" onPress={handleAddInput} color='#1E90FF' />
            </View>
            </ScrollView>
          </View>
        </View>
    </LinearGradient>
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
    color: 'white',
  },
  contentHeaderText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },scrollViewContainer: {
  },
  scrollViewContent: {
    height: 'min-content',
  },
});

export default CreateWorkout;
