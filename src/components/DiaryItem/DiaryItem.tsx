import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { DiaryItemProps } from '../../types/Components/DiaryItem';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DiaryItemScreenNavigationProp } from '../../types/Navigation/DiaryNavigation';

const DiaryItem: React.FC<DiaryItemProps>= ({ diary }) => {

  const navigator = useNavigation<DiaryItemScreenNavigationProp>();

  const handleDiaryItemPress = () => {
    navigator.navigate("DiaryRead", { diary });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDiaryItemPress}>
      <View style={styles.iconContainer}>
      <MaterialIcons name="done-all" size={50} color="black"  style={styles.iconStyle}/>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Diary - {moment(diary.createdAt).format("DD/MM/YYYY HH:mm")}</Text>
        <Text style={styles.footerContent}>Workout: {diary.workoutName || "N/A"}</Text>
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
  contentContainer: {
    flexDirection: 'column',
    flex:3,
    justifyContent: 'space-around'
  },
  footerContent:{
    fontStyle: 'italic'
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 10,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    paddingRight: 10
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center'
  },
  iconStyle:{

  }
});

export default DiaryItem;
