import React from 'react';
import Checkbox from 'expo-checkbox';


const TargetMuscleCheckbox: React.FC = () => {

  return (
    <Checkbox
    disabled={false}
    value={targetMuscles.includes('Chest')}
    onValueChange={() => handleTargetMuscles('Chest')}
  />
  );
};

export default TargetMuscleCheckbox;
