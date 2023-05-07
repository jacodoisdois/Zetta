import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateScreens } from '../../types/StringLiterals/CreateScreens';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

type AddAbsoluteButtonProps = {
  screenName: CreateScreens;
  callBack?: () => void;
};

const AddAbsoluteButton: React.FC<AddAbsoluteButtonProps> = ({ screenName, callBack }: AddAbsoluteButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const [isPressed, setIsPressed] = useState(false);

  const handleScreenNavigation = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      navigator.navigate(screenName, { callBack });
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
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
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
