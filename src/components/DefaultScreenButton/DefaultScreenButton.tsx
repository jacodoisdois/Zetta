import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

type DefaultScreenButtonProps = {
  buttonName: string;
  onPress: () => void;
}

const DefaultScreenButton: React.FC<DefaultScreenButtonProps> = ({buttonName, onPress}) => {

  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor="darkLayBlue"
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{buttonName}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DefaultScreenButton;
