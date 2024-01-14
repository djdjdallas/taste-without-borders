import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { ActivityIndicator } from "react-native-paper";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useUser } from "./UserContext";
const iconForAnalyzeImage = {
  uri: "https://i.ibb.co/Y84cDxp/food1.png",
};
const iconForAnalyzeFoodImage = {
  uri: "https://i.ibb.co/VWjgcK5/food2.png",
};

const HomeScreen = () => {
  const { username, setUsername } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [responseItems, setResponseItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const fetchUserInfo = async () => {
    try {
      const user = await getCurrentUser();
      setUserInfo(user); // Assuming the user object has the properties you need
    } catch (err) {
      console.log(err);
    }
  };

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  // useEffect to fetch user info on component mount
  useEffect(() => {
    fetchUserInfo();
  }, []);
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
  const parseResponse = (responseText) => {
    const dishes = responseText.split("\n\n"); // Assuming each dish is separated by a double newline
    return dishes.map((dish) => {
      const [name, ingredientsStr] = dish.split("\nIngredients\n");
      const ingredients = ingredientsStr ? ingredientsStr.split(", ") : [];
      return { name, ingredients };
    });
  };

  const handleResponse = (responseText) => {
    const parsedResponse = parseResponse(responseText);
    setResponseItems(parsedResponse); // Set parsed response to state
    navigation.navigate("ResponseScreen", {
      responseItems: parsedResponse,
      selectedImage: selectedImage,
    });
  };

  const analyzeImage = async () => {
    if (selectedImage) {
      setIsLoading(true);
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
                text: `Analyze the provided menu image and ensure to translate each dish name into English. For each dish, provide a short list of its common ingredients. Format the response as follows:

  Dish Name: [Translated Dish Name]
  Ingredients: [List of Common Ingredients]

  Please ensure that every dish name is accurately translated to English and that the ingredient lists are brief and precise.`,
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
        max_tokens: 500,
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
      setIsLoading(false);
    } else {
      setResponseText("No image selected");
    }
  };

  const analyzeFoodImage = async () => {
    if (selectedImage) {
      setIsLoading(true);
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
        max_tokens: 1000,
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
      setIsLoading(false);
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
      {/* Display user information */}
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Welcome, {userInfo.username}</Text>
          {/* Display other user details as needed */}
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutButton}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
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
      {isLoading && (
        <ActivityIndicator
          style={{ bottom: 40 }}
          size="large"
          color="#FA4A0C"
        /> // Activity Indicator
      )}

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageSelectedText}>
            Dish Detected. Choose Your Flaventure!
          </Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
            style={styles.image} // Adjust size as needed
          />
        </View>
      )}

      <TouchableOpacity style={styles.buttonPicker} onPress={pickImage}>
        <Text style={styles.buttonTextPicker}>
          Pick an image from camera roll
        </Text>
      </TouchableOpacity>
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
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    color: "#010203",
  },
  descriptionText: {
    fontSize: 20,
    textAlign: "left",
    marginVertical: 3,
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
    marginBottom: 60, // Distance from the bottom
    borderRadius: 50, // Distance from the bottom
    color: "#F6F6F9",
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
  },
  button: {
    width: 160,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    // Assuming you want to set the width to 80% of the screen width
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 40,
    overflow: "visible",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 }, // X and Y offset of the shadow
    shadowOpacity: 0.2, // Opacity of the shadow
    shadowRadius: 10, // Blur radius of the shadow
    elevation: 5,
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
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    width: "75%",
    height: "75%",
  },
  halfImage: {
    position: "absolute",
    width: "100%", // Image takes full width of the button
    height: "100%", // Image takes half height of the button
    // Position the image at the bottom half of the button
    // No need for transform translate since the image is absolutely positioned
  },
  responseText: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#333333",
    fontSize: 18,
    fontWeight: "500",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 20,
    gap: 50,
  },
  userInfoText: {
    fontSize: 16,
    color: "#333",
  },
  signOutButton: {
    backgroundColor: "#FA4A0C",
    borderRadius: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  imageSelectedText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default withAuthenticator(HomeScreen);
