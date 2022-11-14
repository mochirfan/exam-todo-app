import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./src/pages/MainScreen";
import FormScreen from "./src/pages/FormScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodosProvider } from "./src/context/TodosContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodosProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: "TodoList App", headerStyle: { backgroundColor: "#4f88f8" }, headerTintColor: "#fff" }} />
          <Stack.Screen name="FormScreen" component={FormScreen} options={{ title: "New Task", headerStyle: { backgroundColor: "#4f88f8" }, headerTintColor: "#fff" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodosProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
