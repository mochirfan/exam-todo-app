import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useContext } from "react";
import TodosContext from "../context/TodosContext";
import { generateGuid } from "../utils";

const FormScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { dispatch } = useContext(TodosContext);

  const [errors, setErrors] = useState({
    title: false,
    description: false,
  });

  const saveData = async () => {
    if (!title || !description) {
      setErrors((prev) => ({
        title: !title,
        description: !description,
      }));
      return;
    }

    dispatch({
      type: "createTodo",
      payload: {
        title,
        description,
        id: generateGuid(),
      },
    });
    navigation.navigate("MainScreen");
  };

  return (
    <SafeAreaView style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={(title) => setTitle(title)} value={title} placeholder="Input Title" />
        {errors.title ? <Text style={styles.error}>Input Required</Text> : <View></View>}
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} onChangeText={(description) => setDescription(description)} value={description} placeholder="Input Description" />
        {errors.description ? <Text style={styles.error}>Input Required</Text> : <View></View>}
      </View>
      <Button onPress={saveData} title="SAVE"></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formControl: {
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  form: {
    padding: 24,
  },
  error: {
    color: "red",
  },
});

export default FormScreen;
