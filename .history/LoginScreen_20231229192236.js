import { View, Text, TextInput, StyleSheet, Image } from "react-native";
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
        <View style={{ width: "100%", height: 300, backgroundColor: "red" }}>
          <Image />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Sign In</Text>
        </View>
      </View>
      <View>
        <View style={styles.inputText}>
          <Text style={styles.textInput}>Email Address</Text>
          <TextInput
            placeholder="Dom@gmail.com"
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.inputText}>
          <Text style={styles.textInput}>Password</Text>
          <TextInput placeholder="Password" style={styles.input}></TextInput>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#FA4A0C",
  },
  title: {},
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 110,
  },
  text: {
    display: "flex",
    fontSize: 18,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  textInput: {
    color: "#9d9d9d",
    fontSize: 16,
    padding: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
  },
  inputText: {
    display: "flex",
    flexDirection: "column",
    margin: 40,
  },
});

export default LoginScreen;
