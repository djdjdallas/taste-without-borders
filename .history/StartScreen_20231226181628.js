import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Hero from "././assets/Hero.png";
const image = require("/Hero.png");
const StartScreen = () => {
  return (
    <View className="w-full h-full">
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="w-screen h-full"
      ></ImageBackground>
      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
