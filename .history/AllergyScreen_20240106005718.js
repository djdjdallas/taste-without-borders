import { View, Text } from "react-native";
import React from "react";

const AllergyScreen = () => {
  return (
    <View style={styles.container}>
      {/* username and skip button */}

      {/* Image container */}
      <View>
        <Image style={styles.image} source={require("/assets/Allergy.png")} />
      </View>
      {/* question */}
      <View>
        <Text></Text>
        <Text></Text>
      </View>

      {/* Answers */}
      <Text>AllergyScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f9",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontWeight: "semibold",
    fontSize: "28px",
  },
  question: {},
  answer: {},
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

export default AllergyScreen;
