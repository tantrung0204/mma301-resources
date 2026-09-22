import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ThemeContext } from "../ThemeContext";

const TaskItem = ({ item, onToggle, onDelete }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <View style={[styles.item, isDark && styles.darkItem]}>
      <Text
        style={[
          styles.text,
          item.done && styles.doneText,
          isDark && styles.darkText,
        ]}
      >
        {item.text}
      </Text>
      <Button title="Done" onPress={() => onToggle(item.id)} />
      <Button title="Delete" onPress={() => onDelete(item.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  darkItem: {
    backgroundColor: "#444",
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  doneText: {
    textDecorationLine: "line-through",
  },
  darkText: {
    color: "#fff",
  },
});

export default TaskItem;
