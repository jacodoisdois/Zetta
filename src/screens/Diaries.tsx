import React, {useEffect} from 'react';
import { StyleSheet, Text } from 'react-native';
import { retrieveData } from '../libs/SecureStore/General';
import { DiariesProps } from '../types/Navigation/DiaryNavigation';
import { LinearGradient } from 'expo-linear-gradient';



const Diaries = ({navigation} : DiariesProps) => {

  const handleFetchDiares = async () => {

    try{
      const diaryString = await retrieveData('diaries');
      const diaries = diaryString ? JSON.parse(diaryString) : [];
      console.log(diaries);
    }catch(error){
      console.log('Error fetching diaries:', error);
    }

  };

  useEffect(() => {
    handleFetchDiares();

    const unsubscribe = navigation.addListener("focus", handleFetchDiares);

    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>
      <Text>This is Screen 1</Text>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 15,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  exerciseContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
  }
});

export default Diaries;
