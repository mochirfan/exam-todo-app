import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect, useContext } from "react";
import TodoList from "../components/TodoList";

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("FormScreen")}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFA500",
    position: "absolute",
    bottom: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9
  },
  container: {
  },
});

export default MainScreen;
