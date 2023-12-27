import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import Hero from "/assets/hero.png";
const image = { uri: "https://i.ibb.co/RQYb1f7/i-Phone-11-Pro-Max-1.png" };
const StartScreen = () => {
  return (
    <View className="w-screen h-screen">
      <ImageBackground source={Hero} width={100} height={100}></ImageBackground>
      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
