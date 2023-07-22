import React, { useState, useEffect } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import WorkoutItem from "../components/WorkoutItem/WorkoutItem";
import { retrieveData } from "../libs/SecureStore/General";
import { deleteWorkoutById } from "../libs/SecureStore/Workout";
import { workoutType } from "../types/Workout/WorkoutType";
import { WorkoutItemProps } from "../types/Components/WorkoutItem";
import AddAbsoluteButton from "../components/AddAbsoluteButton/AddAbsoluteButton";
import { LinearGradient } from "expo-linear-gradient";
import { WorkoutsProps } from "../types/Navigation/WorkoutNavigation";

const Workouts = ({ navigation } : WorkoutsProps) => {
  const [workouts, setWorkouts] = useState<Array<workoutType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchWorkouts = async () => {
    try {
      const workoutString = await retrieveData("workouts");
      const workouts = workoutString ? JSON.parse(workoutString) : [];
      setWorkouts(workouts);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    handleFetchWorkouts();

    const unsubscribe = navigation.addListener("focus", handleFetchWorkouts);

    return unsubscribe;
  }, [navigation]);

  const handleDeleteWorkout = async (id: string) => {
    await deleteWorkoutById(id);
    handleFetchWorkouts();
  };

  const renderWorkoutItem = ({ item }: { item: workoutType }) => {
    const onPress = () => navigation.navigate("WorkoutRead", { workout: item });

    const onDelete = () => handleDeleteWorkout(item.id as string);

    const props: WorkoutItemProps = { workout: item, onPress, onDelete };

    return <WorkoutItem {...props} />;
  };

  const keyExtractor = (item: workoutType) => item.id as string;

  return (
    <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderWorkoutItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <AddAbsoluteButton screenName="CreateWorkout"/>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    paddingBottom: 16,
    minWidth: "100%",
  },
});

export default Workouts;
