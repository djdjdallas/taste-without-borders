import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AnimatedScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
