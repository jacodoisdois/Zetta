import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputExercise from '../components/InputExercise/InputExercise';
import DefaultScreenButton from '../components/DefaultScreenButton/DefaultScreenButton';


const CreateWorkout: React.FC = () => {
  const [inputExercises, setInputExercises] = useState<{ [key: string]: string }>({});
  const [exercises, setExercises] = useState<string[]>([]);
  const [workoutName, setWorkoutName] = useState<string>('');

  const handleInputExerciseChange = (inputName: string,exerciseName:string) => {
    setInputExercises((prevInputValues) => ({ ...prevInputValues, [inputName]: exerciseName }));
  };

  const handleSaveWorkout = () => {
    const nonEmptyInputs = Object.values(inputExercises).filter((value) => value.trim() !== '');
    setExercises(nonEmptyInputs);
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

        <View>
          <Text style={styles.contentHeaderText}>Exercises:</Text>
          {Object.entries(inputExercises).map(([name]) => (
            <InputExercise
              key={name}
              placeholder={`Exercise ${name.substring(5)}`}
              onChangeText={(text) => { if(text && text !== '') handleInputExerciseChange(name, text)}}
            />
          ))}
          <View style={styles.buttonContainer}>
          <DefaultScreenButton buttonName="Create" onPress={handleSaveWorkout} />
          <DefaultScreenButton buttonName="Add Input" onPress={handleAddInput} />
          </View>
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
  },
});

export default CreateWorkout;
