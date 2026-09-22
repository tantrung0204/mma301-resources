import { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemeContext } from "../ThemeContext";

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState("");
  const { isDark } = useContext(ThemeContext);

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, isDark && styles.darkInput]}
        value={text}
        onChangeText={setText}
        placeholder="New Task"
        placeholderTextColor={isDark ? "#ccc" : "#666"}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderColor: "#999",
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  darkInput: {
    backgroundColor: "#333",
    color: "#fff",
    borderColor: "#555",
  },
});

export default TaskInput;
