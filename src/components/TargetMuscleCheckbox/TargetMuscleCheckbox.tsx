import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { muscles } from '../../types/Workout/WorkoutType';

type MuscleOptionsProps = {
  activeOptions: muscles[];
  setActiveOptions: React.Dispatch<React.SetStateAction<muscles[]>>;
};

const MuscleOptions: React.FC<MuscleOptionsProps> = ({
  activeOptions,
  setActiveOptions,
}) => {
  const muscleOptions: muscles[] = [
    'Shoulders',
    'Chest',
    'Back',
    'Biceps',
    'Triceps',
    'Legs',
    'Abs',
    'Cardio',
    'Other',
  ];

  const handlePress = (option: muscles) => {
    if (activeOptions.includes(option)) {
      setActiveOptions((prevState) => prevState.filter((o) => o !== option));
    } else {
      setActiveOptions((prevState) => [...prevState, option]);
    }
  };

  return (
    <View style={styles.container}>
      {muscleOptions.map((option) => (
        <TouchableOpacity
          key={option}
          style={
            activeOptions.includes(option)
              ? styles.activeOption
              : styles.inactiveOption
          }
          onPress={() => handlePress(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inactiveOption: {
    backgroundColor: 'lightgrey',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  activeOption: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  optionText: {
    color: '#fafafa',
    fontWeight: 'bold',
  },
});

export default MuscleOptions;
