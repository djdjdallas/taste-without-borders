import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const ResponseScreen = ({ route, navigation }) => {
  const { responseItems, selectedImage } = route.params;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
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
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  image: {
    width: "100%", // Full width
    height: 200, // Adjust the height as needed
    resizeMode: "contain", // or 'cover', depending on what you prefer
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FA4A0C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ResponseScreen;
