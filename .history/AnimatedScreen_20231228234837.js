import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AnimatedScreen = () => {
  return (
    <View>
      <LottieView
        autoPlay
        style={{ width: 200, height: 200 }}
        source={(require = "../assets/lottie/taste.json")}
      />
    </View>
  );
};

export default AnimatedScreen;
