import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen"; // Make sure the path is correct
import StartScreen from "./StartScreen";
import ResponseScreen from "./ResponseScreen";
import Amplify from "aws-amplify";
import awsExports from ".src/aws-exports.js";
Amplify.configure(awsExports);

import { ThemeProvider } from "@aws-amplify/ui-react-native";
import LoginScreen from "./LoginScreen";

// import AnimatedScreen from "./AnimatedScreen";
const theme = {
  tokens: {
    colors: {
      font: {
        primary: "black",
      },
    },
  },
};

const Stack = createNativeStackNavigator();

// import { Amplify } from "aws-amplify";
// import amplifyconfig from "./src/amplifyconfiguration.json";
// Amplify.configure(awsExports);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Animated" component={AnimatedScreen} /> */}
          <Stack.Screen name="Start" component={StartScreen} />
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}

          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="ResponseScreen" component={ResponseScreen} />
          {/* You can add more screens to your navigator here */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
