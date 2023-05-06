import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type TabBarIconWrapperProps = {
  children: ReactNode;
};


const TabBarIconWrapper: React.FC<TabBarIconWrapperProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBarIconWrapper;
