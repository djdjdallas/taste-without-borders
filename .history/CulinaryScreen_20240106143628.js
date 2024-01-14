import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const answers = [
  "Italian - Pasta la vista, baby!",
  "Mexican - Tacos for president.",
  "Indian - Spice is the variety of life.",
  "Asian - A mosaic of spice and rice!",
  "None - I eat it all, thank you!",
];
import Fave from "./assets/Favorite.png";

const CulinaryScreen = () => {
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
            /* Handle the press event */
          }}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={Fave} />
      </View>
      {/* question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Pick your culinary soulmate:</Text>
        <Text style={styles.subText}>(aka, favorite cuisine)</Text>
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
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Dietary");
              /* Handle the press event */
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    borderRadius: 100,
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
    top: 60,
    right: 40,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: "bold",
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
    marginTop: 20,
  },
  nextButtonText: {
    backgroundColor: "#FA4A0C",
    color: "white",
    width: 314,
    height: 70,
    marginTop: 20,
    textAlign: "center",
    lineHeight: 70, // Centers text vertically
    borderRadius: 35,
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow effect
  },
});

export default CulinaryScreen;
