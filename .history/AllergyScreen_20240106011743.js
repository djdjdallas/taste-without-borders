import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const answers = ["Yes, it’s a survival thing", "No, I’m an iron stomach!"];

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
        <Text style={styles.text}>Do you have any food allergies?</Text>
        <Text style={styles.subText}>
          (Because we wouldn't want you to meet your maker over a peanut!)
        </Text>
      </View>

      {/* Answers */}
      <View>
        {answers.map((answer, index) => (
          <Text key={index} style={styles.answerText}>
            {answer}
          </Text>
        ))}
      </View>

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
    fontWeight: "bold",
    fontSize: 28,
  },
  subText: {
    fontWeight: "300",
    fontSize: 20,
  },
  answerText: {
    color: "black",
    fontSize: 20,
    marginBottom: 10, // Spacing between answers
  },
  subText: {
    fontWeight: "light",
    fontSize: "20px",
  },
  questionContainer: {
    width: 314, // Width as per your requirement
    height: 70, // Height as per your requirement
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    backgroundColor: "white", // Button background color
    marginBottom: 80, // Distance from the bottom
    borderRadius: 50, // Distance from the bottom
  },
  questionText: {
    color: "black",
    fontSize: "20px",
  },
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
