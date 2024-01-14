import { View, Text, Image, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

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
      <View style={styles.skipButtonContainer}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </View>

      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={allergy} />
      </View>

      {/* question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Do you have any food allergies?</Text>
        <Text style={styles.subText}>
          (Because we wouldn't want you to meet your maker over a peanut!)
        </Text>
      </View>

      {/* Answers */}
      <View style={styles.answerTextContainer}>
        {answers.map((answer, index) => (
          <Text key={index} style={styles.answerText}>
            {answer}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f9",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300, // adjust as needed
    height: 200, // adjust as needed
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  questionContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
  },
  questionText: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
  subText: {
    fontWeight: "300",
    fontSize: 20,
    textAlign: "center",
  },
  answerTextContainer: {
    width: "100%",
    alignItems: "center",
  },
  answerText: {
    color: "black",
    fontSize: 20,
    marginBottom: 10,
    width: 314,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 70, // to vertically center text in the container
    backgroundColor: "white",
    borderRadius: 10,
  },
  skipButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  skipButtonText: {
    fontSize: 16,
  },
});

export default AllergyScreen;
