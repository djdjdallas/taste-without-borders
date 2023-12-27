import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Hero from "././assets/Hero.png";
// const image = { uri: "https://i.ibb.co/RQYb1f7/i-Phone-11-Pro-Max-1.png" };
const StartScreen = () => {
  return (
    <View className="w-full h-full">
      <Image source={Hero} className="w-full h-full"></Image>
      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
