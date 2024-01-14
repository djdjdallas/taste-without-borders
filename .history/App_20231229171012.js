import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen"; // Make sure the path is correct
import StartScreen from "./StartScreen";
import ResponseScreen from "./ResponseScreen";
import { ThemeProvider } from "@aws-amplify/ui-react-native";
// import AnimatedScreen from "./AnimatedScreen";
const theme = {
  overrides: [
    {
      colorMode: "dark",
      tokens: {
        colors: {
          font: {
            primary: "red",
            secondary: "{colors.pink.90}",
            tertiary: "{colors.pink.80}",
          },
          background: {
            primary: "red",
            secondary: "{colors.purple.20}",
            tertiary: "{colors.purple.40}",
          },
          border: {
            primary: "{colors.pink.60}",
            secondary: "{colors.pink.40}",
            tertiary: "{colors.pink.20}",
          },
        },
      },
    },
  ],
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

          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="ResponseScreen" component={ResponseScreen} />
          {/* You can add more screens to your navigator here */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
