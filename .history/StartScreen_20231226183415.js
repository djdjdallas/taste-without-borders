import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const image = { uri: "https://i.ibb.co/RQYb1f7/i-Phone-11-Pro-Max-1.png" };

const StartScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View className="flex-1">
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.button} className=" bg-white">
          <TouchableOpacity className="w-42 h-42 bg-black">
            <Text className="w-[314px] h-[70px] bg-white">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  button: {
    width: "310px",
    height: "70px",
    backgroundColor: "white",
    color: "orange",
  },
});

export default StartScreen;
