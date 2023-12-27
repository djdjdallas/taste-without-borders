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
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  scrollView: {
    marginHorizontal: 10,
    height: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "left",
    marginVertical: 3,
    fontWeight: "300",
    color: "#010203",
    padding: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FA4A0C",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ResponseScreen;
