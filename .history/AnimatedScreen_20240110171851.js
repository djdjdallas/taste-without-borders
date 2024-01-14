import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LOTTI_JSON = require("./assets/lottie/taste.json");

const AnimatedScreen = () => {
  return (
    <View style={{ width: "100%", height: "100%", flex: 1 }}>
      <LottieView
        autoPlay
        loop
        style={{ width: "50%", height: "50%" }}
        source={require("././assets/lottie/taste.json")}
      />
    </View>
  );
};

export default AnimatedScreen;
