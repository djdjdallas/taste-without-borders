import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
const SplashScreen = () => {
  return (
    <View>
      <LottieView
        style={styles.lottie}
        source={require("../assets/lottie/taste.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  lottie: {
    width: "100%",
    height: "100%",
  },
});
