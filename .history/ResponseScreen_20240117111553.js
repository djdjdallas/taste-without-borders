import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ResponseScreen = ({ route }) => {
  const { responseItems, selectedImage } = route.params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
          style={styles.image}
        />
      )}
      <ScrollView style={styles.scrollView}>
        {responseItems.map((item, index) => (
          <View key={index} style={styles.textContainer}>
            <Text style={styles.dishName}>{item.name}</Text>
            {item.ingredients.map((ingredient, idx) => (
              <Text key={idx} style={styles.ingredient}>
                {ingredient}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  textContainer: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dishName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    paddingBottom: 5,
  },
  ingredient: {
    fontSize: 16,
    color: "#7f8c8d",
    paddingBottom: 5,
  },
  image: {
    width: "100%",
    height: windowHeight * 0.3, // Responsive height
    resizeMode: "contain",
    marginTop: 40,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure it takes the full width
  },
  button: {
    backgroundColor: "#FA4A0C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 30,
    width: windowWidth * 0.8, // Responsive width
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResponseScreen;
