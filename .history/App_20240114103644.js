import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen"; // Make sure the path is correct
import StartScreen from "./StartScreen";
import ResponseScreen from "./ResponseScreen";
import { UserContext, UserProvider } from "./UserContext";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
Amplify.configure(amplifyconfig);
import SignUpScreen from "./SignUpScreen";
import { ThemeProvider } from "@aws-amplify/ui-react-native";
import AllergyScreen from "./AllergyScreen";
import DietaryScreen from "./DietaryScreen";
import SpicyScreen from "./SpicyScreen";
import CulinaryScreen from "./CulinaryScreen";
// import LoginScreen from "./LoginScreen";

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
    <UserProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Start" component={StartScreen} />
            {/* <Stack.Screen name="Sign" component={SignUpScreen} /> */}
            <Stack.Screen
              name="Allergy"
              component={AllergyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Dietary" component={DietaryScreen} />
            <Stack.Screen name="Spicy" component={SpicyScreen} />
            <Stack.Screen name="Culinary" component={CulinaryScreen} />
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}

            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="ResponseScreen" component={ResponseScreen} />
            {/* You can add more screens to your navigator here */}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
