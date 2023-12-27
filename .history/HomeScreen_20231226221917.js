import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
const iconForAnalyzeImage = {
  uri: "https://i.ibb.co/Y84cDxp/food1.png",
};
const iconForAnalyzeFoodImage = {
  uri: "https://i.ibb.co/VWjgcK5/food2.png",
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [responseItems, setResponseItems] = useState([]);

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
    setResponseItems(dishes);
    setModalVisible(true);
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
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Start Your</Text>
        <Text style={styles.titleText}>Flavor Adventure ..</Text>
        <Text style={styles.descriptionText}>
          Begin by selecting an image. Then, choose 'Translate Food Menu' for
          clear language comprehension or 'Identify Your Dish' to discover and
          understand the delights on your plate.
        </Text>
      </View>

      <View
        style={{
          borderBottomColor: "#FA4A0C",
          width: "100%",
          borderBottomWidth: 5,
          borderRadius: "5px",
          marginVertical: 30,
        }}
      ></View>
      {/* button group */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={analyzeImage}>
          <Image source={iconForAnalyzeImage} style={styles.halfImage} />
          <View style={styles.buttonTextGroup}>
            <Text style={styles.buttonText}>Translate</Text>
            <Text style={styles.buttonText}>Food Menu</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={analyzeFoodImage}>
          <Image source={iconForAnalyzeFoodImage} style={styles.halfImage} />
          <View style={styles.buttonTextGroup}>
            <Text style={styles.buttonText}>Identify</Text>
            <Text style={styles.buttonText}>Food Image</Text>
          </View>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}

      <TouchableOpacity style={styles.buttonPicker} onPress={pickImage}>
        <Text style={styles.buttonTextPicker}>
          Pick an image from camera roll
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            {responseItems.map((item, index) => (
              <Text key={index} style={styles.modalText}>
                {item}
              </Text>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F2F2F2",
  },
  textContainer: {
    alignItems: "left",
    marginTop: 80,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "left",
    color: "#010203",
  },
  descriptionText: {
    fontSize: 22,
    textAlign: "left",
    marginVertical: 10,
    fontWeight: "300",
    color: "#010203",
  },
  textPicker: {
    color: "#FA4A0C", // Given text color
    fontSize: 16, // Adjusted for typical button text
    fontWeight: "bold",
  },
  buttonPicker: {
    width: 314, // Width as per your requirement
    height: 70, // Height as per your requirement
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    backgroundColor: "#FA4A0C", // Button background color
    marginBottom: 80, // Distance from the bottom
    borderRadius: 50, // Distance from the bottom
    color: "#F6F6F9",
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
  },
  button: {
    width: 180,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    // Assuming you want to set the width to 80% of the screen width
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 40,
    overflow: "visible",
  },
  pickButton: {
    width: 164,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // Assuming you want to set the width to 80% of the screen width
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonTextGroup: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
  buttonTextPicker: {
    fontSize: 18,
    color: "#F6F6F9",
    fontWeight: "bold",
  },
  icon: {
    width: 200, // Set the icon size you want
    height: 200, // Set the icon size you want
    // Space between icon and text
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  halfImage: {
    position: "absolute",
    width: "100%", // Image takes full width of the button
    height: "80%", // Image takes half height of the button
    top: -10, // Position the image at the bottom half of the button
    // No need for transform translate since the image is absolutely positioned
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
