import React from "react";
import { Text, StyleSheet, Platform, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { WorkoutItemProps } from "../../types/Components/WorkoutItem";
import { WorkoutItemScreenNavigationProp } from "../../types/Navigation/WorkoutNavigation";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {

  const navigator = useNavigation<WorkoutItemScreenNavigationProp>();

  const handleWorkoutItemPress = () => {
    navigator.navigate("WorkoutRead", { workout });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleWorkoutItemPress} >
      <View style={styles.iconContainer}>
        <FontAwesome5 name="dumbbell" size={40} color="#444444" />
      </View>
      <View style={styles.contentContainer}>
      <Text style={styles.titleText}>Workout - {workout.name || "N/A"}</Text>
      <View>
      <Text>Target muscles: {workout.targetMuscles.join(', ')}.</Text>
      <Text>
        Created At: {moment(workout.createdAt).format("DD/MM/YYYY HH:mm")}
      </Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: "white",
    height: 100,
    borderRadius: 10,
    margin: 10,
    padding: 5,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#444444",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  contentContainer: {
    flexDirection: 'column',
    flex:3,
    justifyContent: 'space-around',
  },
  footerContent:{
    fontStyle: 'italic'
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 10,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#444444',
    paddingRight: 10
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
    color: '#444444'
  },
  defaultFont:{
    color: '#444444'
  }
});

export default WorkoutItem;
