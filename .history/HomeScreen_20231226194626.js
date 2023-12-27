import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseText, setResponseText] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissions required",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setSelectedImage(result.assets[0].base64);
    }
  };

  const handleResponse = (responseText) => {
    const dishes = responseText.split("\n");
    const formattedResponse = dishes.join("\n\n");
    setResponseText(formattedResponse);
  };

  const analyzeImage = async () => {
    if (selectedImage) {
      const apiKey = "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"; // Replace with your actual API key
      const endpoint = "https://api.openai.com/v1/chat/completions"; // Replace with your actual API endpoint

      const payload = {
        model: "gpt-4-vision-preview", // Replace with your model name
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image and translate it into English?",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${selectedImage}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      };

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0]) {
          handleResponse(data.choices[0].message.content);
        } else {
          setResponseText("Unexpected response structure");
        }
      } catch (error) {
        setResponseText(`Error: ${error.message}`);
      }
    } else {
      setResponseText("No image selected");
    }
  };

  const analyzeFoodImage = async () => {
    if (selectedImage) {
      const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
      const endpoint = "YOUR_API_ENDPOINT"; // Replace with your actual API endpoint

      const payload = {
        model: "YOUR_MODEL_NAME", // Replace with your model name
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this food image and describe it with humor.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${selectedImage}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      };

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0]) {
          handleResponse(data.choices[0].message.content);
        } else {
          setResponseText("Unexpected response structure");
        }
      } catch (error) {
        setResponseText(`Error: ${error.message}`);
      }
    } else {
      setResponseText("No image selected");
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Text Block View Container */}
      <View style={styles.textBlockContainer}>
        <Text>Start Your Flavor Adventure:</Text>
        <Text>
          Choose 'Translate Menus' for language clarity or 'Identify Dishes' to
          explore what's on your plate.
        </Text>
        <View style={styles.lineStyle} />
      </View>

      {/* Button View Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={analyzeImage}>
          <Text style={styles.buttonText}>Translate Food Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={analyzeFoodImage}>
          <Text style={styles.buttonText}>Identify Your Dish</Text>
        </TouchableOpacity>
      </View>

      {/* Response Text */}
      {responseText ? (
        <Text style={styles.responseText}>{responseText}</Text>
      ) : null}

      {/* Optionally, you might want to display the selected image somewhere */}
      {selectedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
            style={styles.imagePreview}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  lineStyle: {
    height: 2,
    backgroundColor: "black",
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 164,
    height: 208,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 5, // This adds the drop shadow on Android
    shadowColor: "#000", // These 3 lines add the shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20, // Adjust as needed for space from bottom
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  responseText: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});

export default HomeScreen;
