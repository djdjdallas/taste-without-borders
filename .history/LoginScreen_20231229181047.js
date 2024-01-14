import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View>
      <View style={styles.container2}>
        <View>
          <Text style={styles.text}>Sign In</Text>
        </View>
      </View>
      <View>
        <Text style={styles}>Sign In</Text>
        <TextInput placeholder="Dom@gmail.com" style={styles.input}></TextInput>
        <Text style={styles}>Sign In</Text>
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
    backgroundColor: "white",
    borderRadius: 50,
  },
  title: {},
  text: {
    position: "absolute",
    top: 350,
    left: 80,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    margin: 50,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
  },
});

export default LoginScreen;
