import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

type InputExerciseProps = {
  placeholder: string;
  onChangeText: (value: string) => void;
};

const InputExercise: React.FC<InputExerciseProps> = ({ placeholder, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      placeholder={placeholder}
      placeholderTextColor={isFocused ? '#FFF' : '#CCCCCC'}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
  },
  inputFocused: {
    borderColor: '#FFF',
  },
});

export default InputExercise;
