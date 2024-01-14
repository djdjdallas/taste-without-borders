import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const image = { uri: "https://i.ibb.co/RQYb1f7/i-Phone-11-Pro-Max-1.png" };
const hero = { uri: "https://i.ibb.co/zQtzrR4/hero-2.png" };

const StartScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/new-hero.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Allergy");
            /* Handle the press event */
          }}
        >
          <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end", // Aligns children to the bottom
    alignItems: "center", // Centers children horizontally
  },
  text: {
    color: "#FA4A0C", // Given text color
    fontSize: 16, // Adjusted for typical button text
    fontWeight: "bold",
  },
  button: {
    width: 314, // Width as per your requirement
    height: 70, // Height as per your requirement
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    backgroundColor: "white", // Button background color
    marginBottom: 80, // Distance from the bottom
    borderRadius: 50, // Distance from the bottom
  },
});

export default StartScreen;
