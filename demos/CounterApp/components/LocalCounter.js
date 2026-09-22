import { useReducer } from "react";
import { Button, Text, View } from "react-native";

export const localReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "reset":
      return 0;
    case "decrement":
      return state - 1;
  }
};

export default function LocalCounter() {
  const [count, dispatch] = useReducer(localReducer, 0);

  return (
    <View style={{ gap: 12, width: "100%" }}>
      <Text style={{ fontSize: 22 }}>LocalCounter (useReducer)</Text>
      <Text accessibilityLabel={`Local: ${count}`} style={{ fontSize: 36 }}>
        {count}
      </Text>
      <Button
        title="Increment Local"
        onPress={() => dispatch({ type: "increment" })}
      />
      <Button
        title="Decrement Local"
        onPress={() => dispatch({ type: "decrement" })}
      />
      <Button title="Reset Local" onPress={() => dispatch({ type: "reset" })} />
    </View>
  );
}
