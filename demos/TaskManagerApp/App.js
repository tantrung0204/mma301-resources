import { useReducer, useContext } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import { taskReducer, initialState } from "./reducers/taskReducer";
import { ThemeContext } from "./ThemeContext";

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
      <TaskInput onAdd={(text) => dispatch({ type: "ADD", payload: text })} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={(id) => dispatch({ type: "TOGGLE", payload: id })}
            onDelete={(id) => dispatch({ type: "DELETE", payload: id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#222",
  },
});
