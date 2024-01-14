import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";

const LOTTI_JSON = require("./assets/lottie/taste.json");
const AnimatedScreen = () => {
  return (
    <View>
      <AnimatedLottieView
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
        source={LOTTI_JSON}
      />
    </View>
  );
};

export default AnimatedScreen;
