import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const answers = [
  "Vegetarian - Friends, not food!",
  "Vegan - Even my clothes are plant-based.",
  "Dairy-Free - Cows are friends, not fridges.",
  "None - I eat it all, thank you!",
];
import Diet from "./assets/Diet.png";

const DietaryScreen = () => {
  const navigation = useNavigation();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onSelectAnswer = async (answer) => {
    setSelectedAnswer(answer);
    try {
      await AsyncStorage.setItem("userDiet", answer);
    } catch (e) {
      console.error("Error saving dietary data", e);
    }
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
        <Image style={styles.image} source={Diet} />
      </View>
      {/* question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Which of these dietary restrictions do you proudly wave as your flag?
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
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate("Spicy");
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
    height: 275, // adjust as needed
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  questionContainer: {
    alignItems: "center",
    marginBottom: 30,
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
    paddingHorizontal: 15,
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
  nextButton: {
    backgroundColor: "#FA4A0C",
    width: 314,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow effect
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default DietaryScreen;
