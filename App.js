import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Screens
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FingerprintScreen from "./screens/FingerprintScreen";
import DocumentScreen from "./screens/DocumentScreen";

//React Navigation Setup
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
        <Stack.Screen name="Document" component={DocumentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
