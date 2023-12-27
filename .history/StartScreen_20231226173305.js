import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
const image = { uri: "https://i.ibb.co/RQYb1f7/i-Phone-11-Pro-Max-1.png" };
const StartScreen = () => {
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
        <View>
          <TouchableOpacity>
            <Image></Image>
            <Text>Translate Food Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image></Image>
            <Text>Identify Your Meal</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StartScreen;
