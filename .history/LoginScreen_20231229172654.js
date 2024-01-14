import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <View>
      <Text>Sign In</Text>
      <TextInput placeholder="Dom@gmail.com"></TextInput>
      <TextInput placeholder="Password"></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
  },
});

export default LoginScreen;
