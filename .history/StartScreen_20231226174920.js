import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
const image = { uri: "https://i.ibb.co/RQYb1f7/i-Phone-11-Pro-Max-1.png" };
const StartScreen = () => {
  return (
    <View>
      <ImageBackground
        source={image}
        resizeMode="cover"
        width={100}
        height={100}
      ></ImageBackground>
      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
