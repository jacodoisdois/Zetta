import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard  } from 'react-native';

type InputExerciseProps = {
  placeholder?: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'numeric';
};

const InputExercise: React.FC<InputExerciseProps> = ({ placeholder, onChangeText, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      placeholder={placeholder}
      placeholderTextColor={isFocused ? '#FFF' : '#CCCCCC'}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      keyboardType={keyboardType}
    />
    </TouchableWithoutFeedback>
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
    color: '#fafafa',
    marginVertical: 10,
  },
  inputFocused: {
    borderColor: '#FFF',
  },
});

export default InputExercise;
