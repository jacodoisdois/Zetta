import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateScreens } from '../../types/StringLiterals/CreateScreens';
import { AntDesign } from '@expo/vector-icons';

type AddAbsoluteButtonProps = {
  screenName: CreateScreens;
};

const AddAbsoluteButton: React.FC<AddAbsoluteButtonProps> = ({ screenName }) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const handleScreenNavigation = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      navigation.navigate(screenName as never);
    }, 200);
  };

  const buttonStyle = isPressed ? styles.buttonPressed : styles.button;

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.7}
      onPress={handleScreenNavigation}
    >
      <AntDesign name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6bbcff',
    padding: 10,
    borderRadius: 360,
  },
  buttonPressed: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6bbcff',
    padding: 10,
    borderRadius: 360,
    transform: [{ scale: 0.9 }],
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddAbsoluteButton;
