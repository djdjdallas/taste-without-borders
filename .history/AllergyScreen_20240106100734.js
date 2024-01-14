import { View, Text, Image, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchUserAttributes } from "aws-amplify/auth";
const answers = ["Yes, it’s a survival thing", "No, I’m an iron stomach!"];
import allergy from "./assets/Allergy.png";
const AllergyScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={styles.container}>
      {/* username and skip button */}
      <View>
        {/* <Text>Hi, {user}</Text> */}
        <Text>Skip</Text>
      </View>
      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={allergy} />
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
  imageContainer: {
    width: "100%",
    height: 400,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    font: 28,
  },
  subText: {
    fontWeight: "300",
    font: 20,
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
