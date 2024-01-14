import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <View>
      <View style={styles.container2}></View>
      <View>
        <Text>Sign In</Text>
        <TextInput placeholder="Dom@gmail.com" style={styles.input}></TextInput>
        <TextInput placeholder="Password" style={styles.input}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  container2: {
    width: "100%",
    height: 380,
  },
  title: {},
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
  },
});

export default LoginScreen;
