import { View, Text } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

const AnimatedScreen = () => {
  return (
    <View>
      <AnimatedLottieView
        autoPlay
        style={{ width: 200, height: 200 }}
        source={(require = "@assets/lottie/taste.json")}
      />
    </View>
  );
};

export default AnimatedScreen;
