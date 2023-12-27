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
          <Text key={index} style={styles.text}>
            {item}
          </Text>
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
    flex: 1, // Ensure it takes up all available space
    paddingHorizontal: 20, // Add some horizontal padding
  },
  text: {
    fontSize: 16,
    color: "#000",
    padding: 10,
    flexShrink: 1, // Ensure text shrinks to fit
  },
  button: {
    backgroundColor: "#FA4A0C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10, // Adds margin at the top and bottom
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ResponseScreen;
