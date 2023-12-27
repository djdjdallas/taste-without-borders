import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ResponseScreen = ({ route, navigation }) => {
  const { responseItems } = route.params;

  return (
    <View style={styles.container}>
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
    marginBottom: 10, // Add space between text items
  },
  text: {
    fontSize: 16,
    color: "#000",
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
