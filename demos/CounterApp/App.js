import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import LocalCounter from "./components/LocalCounter";
import GlobalCounter from "./components/GlobalCounter";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>Hai bộ đếm độc lập</Text>
        <LocalCounter />
        <GlobalCounter />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 32,
  },
  title: { fontSize: 26, fontWeight: "bold" },
});
