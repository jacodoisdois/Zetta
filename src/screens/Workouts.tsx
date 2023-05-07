import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/Navigation/WorkNavigation";
import WorkoutItem from "../components/WorkoutItem/WorkoutItem";
import { retrieveData, deleteWorkoutById } from "../libs/SecureStore/Workout";
import { workoutType } from "../types/Workout/WorkoutType";
import { WorkoutItemProps } from "../types/Components/WorkoutItem";
import AddAbsoluteButton from "../components/AddAbsoluteButton/AddAbsoluteButton";

type WorkoutsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Workouts"
>;

type WorkoutsProps = {
  navigation: WorkoutsScreenNavigationProp;
};

const Workouts: React.FC<WorkoutsProps> = ({ navigation }) => {
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
    <View style={styles.container}>
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
    </View>
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
  },
});

export default Workouts;
