import { workoutType } from "../Workout/WorkoutType";

export type WorkoutItemProps = {
  workout: workoutType;
  onPress: () => void;
  onDelete: () => Promise<void>;
};
