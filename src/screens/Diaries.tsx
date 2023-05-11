import React, {useEffect, useState} from 'react';
import { StyleSheet, Text } from 'react-native';
import { retrieveData } from '../libs/SecureStore/General';
import { DiariesProps } from '../types/Navigation/DiaryNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import { DiaryType } from '../types/Diary/DiaryType';
import { FlatList } from 'react-native-gesture-handler';
import DiaryItem from '../components/DiaryItem/DiaryItem';
import { DiaryItemProps } from '../types/Components/DiaryItem';
import { deleteDiaryById } from '../libs/SecureStore/Diary';



const Diaries = ({navigation} : DiariesProps) => {
  const [diares, setDiaries] = useState<Array<DiaryType>>([]);
  const [isLoading, setIsLoading] = useState(true);


  const handleFetchDiares = async () => {
    try{
      const diaryString = await retrieveData('diaries');
      const diaries = diaryString ? JSON.parse(diaryString) : [];
      setDiaries(diaries);
      setIsLoading(false);
    }catch(error){
      console.log('Error fetching diaries:', error);
    }

  };

  useEffect(() => {
    handleFetchDiares();

    const unsubscribe = navigation.addListener("focus", handleFetchDiares);

    return unsubscribe;
  }, [navigation]);

  const handleDeleteDiary = async (id: string) => {
    await deleteDiaryById(id);
    handleFetchDiares();
  };

  const renderDiaryItem = ({item} : {item: DiaryType}) => {
    const onPress = () => navigation.navigate('DiaryRead', {diary: item});
    const onDelete = () => handleDeleteDiary(item.id as string);
    const props: DiaryItemProps = {diary: item, onPress, onDelete};
    return <DiaryItem {...props} />;
  };

  const keyExtractor = (item: DiaryType) => item.id as string;

  return (
    <LinearGradient colors={['#62c0ff', '#44a8eb', '#61bbf7']} style={styles.container}>
      {
        isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
          data={diares}
          renderItem={renderDiaryItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          />
        )
      }
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
    justifyContent: 'space-evenly',
  },
  listContainer:{

  }
});

export default Diaries;
