import { View, Text, TextInput } from "react-native";
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

export default LoginScreen;
