import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AnimatedScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(234,50,20)",
      }}
    >
      <LottieView
        autoPlay
        loop
        style={{ width: 400, height: 400 }}
        source={require("././assets/lottie/taste.json")}
      />
    </View>
  );
};

export default AnimatedScreen;
