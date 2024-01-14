import React, { useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { signUp, signIn } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const logoImage = require("./assets/taste-logo.png");

const SignUpScreen = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [actualUsername, setActualUsername] = useState(""); // Actual username
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Used as username for AWS Amplify
  const navigation = useNavigation();

  const handleUserSignUp = async () => {
    if (email === "" || password === "" || actualUsername === "") {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      await signUp({
        username: email, // Using email as the username for AWS Amplify
        password,
        attributes: {
          email,
          // You can add custom attributes here if your Cognito setup allows it
        },
      });
      await AsyncStorage.setItem("username", actualUsername); // Saving the actual username locally
      Alert.alert("Sign Up Successful", "You have successfully signed up!");
      navigation.navigate("allergy");
      // Navigate to HomeScreen or another screen if needed
    } catch (error) {
      console.log("error signing up:", error);
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  const handleUserSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      await signIn({ username: email, password });
      Alert.alert("Sign In Successful", "Welcome back!");
      navigation.navigate("allergy");
      // Navigate to HomeScreen or another screen if needed
    } catch (error) {
      console.log("error signing in", error);
      Alert.alert("Sign In Failed", error.message);
    }
  };

  const handleSubmit = () => {
    if (isSigningUp) {
      handleUserSignUp();
    } else {
      handleUserSignIn();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, !isSigningUp && styles.activeTab]}
          onPress={() => setIsSigningUp(false)}
        >
          <Text style={[styles.tabText, !isSigningUp && styles.activeTabText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, isSigningUp && styles.activeTab]}
          onPress={() => setIsSigningUp(true)}
        >
          <Text style={[styles.tabText, isSigningUp && styles.activeTabText]}>
            Sign-up
          </Text>
        </TouchableOpacity>
      </View>

      {isSigningUp && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={actualUsername}
          onChangeText={setActualUsername}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>
          {isSigningUp ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>

      {!isSigningUp && (
        <TouchableOpacity
          onPress={() => {
            // TODO: Add forgot password logic
          }}
        >
          <Text style={styles.forgotPassword}>Forgot passcode?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff", // Assuming white background
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FA4A0C", // Color of the active tab indicator
  },
  tabText: {
    fontWeight: "bold",
    color: "#bbbbbb", // Color of inactive tab text
  },
  activeTabText: {
    color: "#FA4A0C", // Color of the active tab text
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderColor: "#cccccc",
    padding: 10,
    borderBottomWidth: 1,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA4A0C",
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  forgotPassword: {
    marginTop: 10,
    color: "#FA4A0C",
    textAlign: "center",
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 50, // Adjust the top margin to push the image up
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#FA4A0C",
    width: 314,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow effect
    alignSelf: "center", // Center button horizontally
    marginBottom: 20, // Add some margin at the bottom
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default SignUpScreen;
