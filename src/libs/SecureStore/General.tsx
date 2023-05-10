import * as SecureStore from 'expo-secure-store';

export const retrieveData = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      console.log('Value retrieved successfully!');
      return value;
    } else {
      console.log('Value not found.');
      return null;
    }
  } catch (error) {
    console.log('Error retrieving value:', error);
    return null;
  }
};
