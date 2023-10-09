import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/store/index";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Navigation />
    </Provider>
  );
}
