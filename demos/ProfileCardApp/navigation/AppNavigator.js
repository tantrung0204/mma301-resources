import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import StyledScreen from "../screens/StyledScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileList" component={HomeScreen} />

      <Stack.Screen
        name="ProfileDetail"
        component={DetailScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStack} />

      <Tab.Screen
        name="StyledTab"
        component={StyledScreen}
        options={{ title: "Styled" }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="MainDrawer"
          component={TabNavigator}
          options={{ title: "Home" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
