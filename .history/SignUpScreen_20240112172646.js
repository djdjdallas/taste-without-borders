// SignUpScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signUp, signIn } from "aws-amplify/auth";

const SignUpScreen = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleToggleSignUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  const handleAction = async () => {
    if (isSigningUp) {
      try {
        await signUp({
          username,
          password,
          email,
          phone_number: phoneNumber,
        });
        Alert.alert("Sign Up Successful", "You have successfully signed up!");
      } catch (error) {
        console.log("error signing up:", error);
        Alert.alert("Sign Up Failed", error.message);
      }
    } else {
      try {
        await signIn({ username, password });
        Alert.alert("Sign In Successful", "Welcome back!");
      } catch (error) {
        console.log("error signing in", error);
        Alert.alert("Sign In Failed", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, !isSigningUp && styles.activeTab]}
          onPress={() => setIsSigningUp(false)}
        >
          <Text style={[styles.tabText, !isSigningUp && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, isSigningUp && styles.activeTab]}
          onPress={() => setIsSigningUp(true)}
        >
          <Text style={[styles.tabText, isSigningUp && styles.activeTabText]}>Sign-up</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Email address"
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
        {isSigningUp && (
        // Include any additional fields for sign-up here
      )}

      <TouchableOpacity style={styles.button} onPress={handleAction}>
        <Text style={styles.buttonText}>{isSigningUp ? "Sign Up" : "Login"}</Text>
      </TouchableOpacity>

      {!isSigningUp && (
        <TouchableOpacity onPress={() => { /* Forgot password handler */ }}>
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
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
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
});

export default SignUpScreen;
