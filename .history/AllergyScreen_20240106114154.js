import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const answers = ["Yes, it’s a survival thing", "No, I’m an iron stomach!"];
import allergy from "./assets/Allergy.png";

const AllergyScreen = () => {
  const navigation = useNavigation();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

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
          <TouchableOpacity
            key={index}
            style={[
              styles.answerText,
              selectedAnswer === answer && styles.selectedAnswer,
            ]}
            onPress={() => onSelectAnswer(answer)}
          >
            <Text
              style={[
                styles.answerTextContent,
                selectedAnswer === answer && styles.selectedAnswerText,
              ]}
            >
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.nextButtonContainer}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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
    height: 300, // adjust as needed
    marginBottom: 20,
    backgroundColor: "red",
  },
  image: {
    width: "100%",
    height: "90%",
  },
  questionContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
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
    paddingHorizontal: 15,
  },
  answerTextContainer: {
    width: "100%",
    alignItems: "center",
  },
  answerText: {
    backgroundColor: "white",
    width: 314,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 35,
  },
  skipButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  skipButtonText: {
    fontSize: 16,
  },
  selectedAnswer: {
    backgroundColor: "#FA4A0C",
  },
  answerTextContent: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  selectedAnswerText: {
    color: "white",
  },
  nextButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  nextButtonText: {
    backgroundColor: "white",
    width: 314,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 35,
  },
});

export default AllergyScreen;
