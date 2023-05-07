import React from "react";
import { Text, StyleSheet} from "react-native";
import { workoutType } from "../../types/Workout/WorkoutType";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";



export default function WorkoutItem({workout}: {workout: workoutType}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigator = useNavigation<NativeStackNavigationProp<any>>();

  const handleWorkoutPress = () => {
    navigator.navigate('WorkoutRead', { workout } );
  };


  return (
    <TouchableOpacity style={styles.container} onPress={() => handleWorkoutPress()}>
      <Text style={styles.titleText}>{workout.name || 'N/A'}</Text>
      <Text>{moment(workout.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: 100,
    borderRadius: 10,
    margin: 10,
    padding: 5,
    justifyContent: "space-between",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
  }
});
