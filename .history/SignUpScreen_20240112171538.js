// SignUpScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signUp, signIn } from "aws-amplify/auth";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUserSignUp = async () => {
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
  };

  const handleUserSignIn = async () => {
    try {
      await signIn({ username, password });
      Alert.alert("Sign In Successful", "Welcome back!");
    } catch (error) {
      console.log("error signing in", error);
      Alert.alert("Sign In Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleUserSignUp} />
        <Button title="Sign In" onPress={handleUserSignIn} color="orange" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default SignUpScreen;
