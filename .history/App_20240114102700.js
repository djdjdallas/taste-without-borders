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
const myTheme = {
  name: "my-theme",
  tokens: {
    components: {
      authenticator: {
        backgroundColor: "white",
        color: "black",
      },
      button: {
        backgroundColor: "#FA4A0C",
        borderRadius: "35px",
        color: "white",
        paddingBlock: "1.75rem",
        paddingInline: "0",
        fontWeight: "700",
        fontSize: "1.25rem",
        _hover: {
          backgroundColor: "#FA4A0C",
        },
        _focus: {
          backgroundColor: "#FA4A0C",
          boxShadow: "none",
        },
      },
      input: {
        backgroundColor: "white",
        borderColor: "#cccccc",
        borderRadius: "0",
        paddingBlock: "0.5rem",
        paddingInline: "1rem",
        _focus: {
          borderColor: "#cccccc",
          boxShadow: "none",
        },
      },
      heading: {
        color: "black",
      },
      tabs: {
        tablist: {
          borderBottomColor: "#cccccc",
        },
        tab: {
          color: "#bbbbbb",
          _selected: {
            color: "#FA4A0C",
            borderBottomColor: "#FA4A0C",
          },
        },
      },
      label: {
        color: "black",
      },
      errorMessage: {
        color: "#FA4A0C",
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
      <ThemeProvider theme={myTheme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Start" component={StartScreen} />
            {/* <Stack.Screen name="Sign" component={SignUpScreen} /> */}
            <Stack.Screen name="Allergy" component={AllergyScreen} />
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
