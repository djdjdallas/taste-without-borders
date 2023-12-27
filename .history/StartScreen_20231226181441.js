import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Hero from "././assets/Hero.png";
const image = require("/hero.png");
const StartScreen = () => {
  return (
    <View className="w-full h-full">
      <Image
        source={image}
        resizeMode="cover"
        className="w-screen h-full"
      ></Image>
      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
