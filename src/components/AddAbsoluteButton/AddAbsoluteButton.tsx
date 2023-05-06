import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateScreens } from '../../types/StringLiterals/CreateScreens';

type AddAbsoluteButtonProps = {
  screenName: CreateScreens;
}

const AddAbsoluteButton: React.FC<AddAbsoluteButtonProps> = ({screenName}) => {
  const navigation = useNavigation();

  const handleScreenNavigation = () => {
    navigation.navigate(screenName as never);
  };

  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => handleScreenNavigation()}
      underlayColor="darkLayBlue"
    >
      <Text style={styles.buttonText}>Test</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddAbsoluteButton;
