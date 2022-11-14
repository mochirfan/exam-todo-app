import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import TodosContext from "../context/TodosContext";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const TodoList = () => {
  const { state, dispatch } = useContext(TodosContext);
  const [watchTodoList, setWatchTodoList] = useState([]);
  const [sortDir, setSortDir] = useState("asc");
  const [loadedSize, setloadedSize] = useState(10);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setWatchTodoList(state.todos);
  }, [state.todos]);

  const getTodoItem = ({ item: todo }) => {
    return (
      <View style={todo.isChecked ? styles.itemChecked : styles.item}>
        <View>
          <BouncyCheckbox
            fillColor="blue"
            onPress={(isChecked: boolean) => {
              dispatch({
                type: "updateTodo",
                payload: { ...todo, isChecked: isChecked },
              });
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{todo.title}</Text>
          <Text style={styles.description}>{todo.description}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteTask(todo)}>
          <Ionicons name="remove-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const deleteTask = (todo) => {
    dispatch({
      type: "deleteTodo",
      payload: todo,
    });
  };

  const handleSearchAndSort = (keyword) => {
    setWatchTodoList((prev) => {
      const filtered = state.todos.filter((f) => f.title.toLowerCase().includes(keyword.toLowerCase()) || f.description.toLowerCase().includes(keyword.toLowerCase()));
      return filtered;
    });
  };

  const onSearchChange = (e) => {
    setKeyword(e);
    handleSearchAndSort(e);
  };

  const onSortChanged = () => {
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    handleSearchAndSort(keyword);
  };

  const loadMorehandler = () => {
    setloadedSize((prev) => prev + 10);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.search}>
          <TextInput style={styles.searchInput} onChangeText={(e) => onSearchChange(e)} placeholder="Search Task ..." />
          <Ionicons name="search" size={18} color="black" />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => onSortChanged()}>
          <Text>
            Sort
            {sortDir === "asc" ? <MaterialCommunityIcons name="sort-alphabetical-ascending" size={18} color="black" /> : <MaterialCommunityIcons name="sort-alphabetical-descending" size={18} color="black" />}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.items}>
        {watchTodoList.length > 0 ? (
          <FlatList
            style={{ minHeight: "100%" }}
            keyExtractor={(todoItem) => todoItem.id}
            data={watchTodoList.sort((a, b) => (a.title > b.title ? (sortDir == "asc" ? 1 : -1) : sortDir == "asc" ? -1 : 1)).slice(0, loadedSize)}
            renderItem={getTodoItem}
            contentContainerStyle={{ flexGrow: 1 }}
            ListFooterComponentStyle={{ flex: 1, justifyContent: "flex-end" }}
            ListFooterComponent={loadedSize < watchTodoList.length ? <Button title="Load More" onPress={() => loadMorehandler()}></Button> : <View />}
          />
        ) : (
          <View style={styles.noData}>
            <Text>No Data</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    paddingTop: 80,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    flexGrow: 1,
  },
  noData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  item: {
    backgroundColor: "#fff",
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 6,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    alignItems: "center",
  },
  itemChecked: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#4f88f8",
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 4,
  },
  searchInput: {
    borderColor: "#ccc",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
    flexGrow: 1,
  },
  search: {
    marginRight: 8,
    flexGrow: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 6,
  },
  content: {
    flexGrow: 1,
  },
  filterContainer: {
    flexDirection: "row",
    marginTop: 8,
    padding: 8,
    position: "absolute",
    zIndex: 1,
    width: "100%",
  },
  filterButton: {
    backgroundColor: "#fff",
    padding: 8,
    width: 80,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TodoList;
