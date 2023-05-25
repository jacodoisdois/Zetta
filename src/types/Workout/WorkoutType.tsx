export type workoutType = {
  id?: string;
  name: string;
  description: string;
  targetMuscles: muscles[];
  exercises: string[];
  createdAt: Date;
};

export type muscles = 'Shoulders' | 'Chest' | 'Back' | 'Biceps' | 'Triceps' | 'Legs' | 'Abs' | 'Cardio' | 'Other';
