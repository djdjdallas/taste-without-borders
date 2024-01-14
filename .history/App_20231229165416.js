import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen"; // Make sure the path is correct
import StartScreen from "./StartScreen";
import ResponseScreen from "./ResponseScreen";
import amplifyconfig from "./src/amplifyconfiguration.json";
// import AnimatedScreen from "./AnimatedScreen";

const Stack = createNativeStackNavigator();
import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";
// import { Amplify } from "aws-amplify";
// import amplifyconfig from "./src/amplifyconfiguration.json";
// Amplify.configure(awsExports);
const App = () => {
  return (
    <NavigationContainer>
      <withAuthenticator>
        <Stack.Navigator>
          {/* <Stack.Screen name="Animated" component={AnimatedScreen} /> */}
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="ResponseScreen" component={ResponseScreen} />
          {/* You can add more screens to your navigator here */}
        </Stack.Navigator>
      </withAuthenticator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
