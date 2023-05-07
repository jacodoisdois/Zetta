import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { WorkoutItemProps } from "../../types/Components/WorkoutItem";
import { WorkoutReadScreenNavigationProp } from "../../types/Navigation/WorkNavigation";
import { useNavigation } from "@react-navigation/native";

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {

  const navigator = useNavigation<WorkoutReadScreenNavigationProp>();

  const handleWorkoutPress = () => {
    navigator.navigate("WorkoutRead", { workout });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleWorkoutPress} >
      <Text style={styles.titleText}>{workout.name || "N/A"}</Text>
      <Text>
        {moment(workout.createdAt).format("DD/MM/YYYY HH:mm")}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: 100,
    borderRadius: 10,
    margin: 10,
    padding: 5,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default WorkoutItem;
