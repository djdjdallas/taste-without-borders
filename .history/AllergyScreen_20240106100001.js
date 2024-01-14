import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const answers = ["Yes, it’s a survival thing", "No, I’m an iron stomach!"];

const AllergyScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectAnswer = async (answer) => {
    setSelectedAnswer(answer);
    try {
      // Store the answer locally
      await AsyncStorage.setItem("userAllergy", answer);
      // Here you can also send the answer to your server if needed
      Alert.alert("Response Recorded", `Your answer: ${answer}`);
    } catch (error) {
      // Error saving data
      console.error("Error storing user response", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* username and skip button */}
      <View style={styles.skipButtonContainer}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </View>
      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("./assets/Allergy.png")} />
      </View>
      {/* question */}
      <View style={styles.questionContainer}>
        <Text style={styles.text}>Do you have any food allergies?</Text>
        <Text style={styles.subText}>
          (Because we wouldn't want you to meet your maker over a peanut!)
        </Text>
      </View>
      {/* Answers */}
      <View style={styles.answersContainer}>
        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedAnswer === answer ? styles.selectedButton : null,
            ]}
            onPress={() => handleSelectAnswer(answer)}
          >
            <Text
              style={[
                styles.answerText,
                selectedAnswer === answer ? styles.selectedText : null,
              ]}
            >
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f9",
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "80%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 10,
  },
  subText: {
    fontWeight: "300",
    fontSize: 20,
    marginBottom: 20,
  },
  answersContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#FA4A0C",
  },
  answerText: {
    color: "black",
    fontSize: 20,
  },
  selectedText: {
    color: "white",
  },
  skipButtonContainer: {
    alignSelf: "flex-end",
  },
  skipButtonText: {
    fontSize: 16,
  },
  questionContainer: {
    marginBottom: 20,
  },
});

export default AllergyScreen;
