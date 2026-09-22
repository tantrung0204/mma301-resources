import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/counterSlice";

export default function GlobalCounter() {
  const count = useSelector((state) => state.count.value);
  const dispatch = useDispatch();

  return (
    <View style={{ gap: 12, width: "100%" }}>
      <Text style={{ fontSize: 22 }}>GlobalCounter (Redux Toolkit)</Text>
      <Text accessibilityLabel={`Global: ${count}`} style={{ fontSize: 36 }}>
        {count}
      </Text>
      <Button title="Increment Global" onPress={() => dispatch(increment())} />
      <Button title="Decrement Global" onPress={() => dispatch(decrement())} />
      <Button title="Reset Global" onPress={() => dispatch(reset())} />
    </View>
  );
}
