import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { signUp, signIn, confirmSignUp } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const logoImage = require("./assets/taste-logo.png");

const SignUpScreen = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Reset states when switching between sign up and login
    setEmail("");
    setPassword("");
    setVerificationCode("");
    setIsVerifying(false);
  }, [isSigningUp]);

  const handleUserSignUp = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      const signUpResponse = await signUp({
        username: email,
        password,
        attributes: { email },
      });

      // Check if the user needs to be confirmed
      if (!signUpResponse.userConfirmed) {
        setIsVerifying(true); // Proceed to verification
        await AsyncStorage.setItem("unconfirmedEmail", email); // Store email for verification
      } else {
        // User is auto-confirmed
        navigation.navigate("Allergy");
      }
    } catch (error) {
      console.log("error signing up:", error);
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  const handleUserSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      await signIn({ username: email, password });
      Alert.alert("Sign In Successful", "Welcome back!");
      navigation.navigate("Allergy");
    } catch (error) {
      console.log("error signing in:", error);
      Alert.alert("Sign In Failed", error.message);
    }
  };

  const handleVerification = async () => {
    const savedEmail = await AsyncStorage.getItem("unconfirmedEmail");
    if (!savedEmail) {
      Alert.alert(
        "Verification Error",
        "Unable to verify. Please sign up again."
      );
      return;
    }

    try {
      await confirmSignUp(savedEmail, verificationCode);
      Alert.alert("Verification Successful", "Your email is verified!");
      setIsVerifying(false);
      AsyncStorage.removeItem("unconfirmedEmail");
      navigation.navigate("Allergy");
    } catch (error) {
      console.log("error confirming sign up:", error);
      Alert.alert("Verification Failed", error.message);
    }
  };

  const handleSubmit = () => {
    if (isVerifying) {
      handleVerification();
    } else if (isSigningUp) {
      handleUserSignUp();
    } else {
      handleUserSignIn();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, !isSigningUp && styles.activeTab]}
          onPress={() => setIsSigningUp(false)}
        >
          <Text style={[styles.tabText, !isSigningUp && styles.activeTabText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, isSigningUp && styles.activeTab]}
          onPress={() => setIsSigningUp(true)}
        >
          <Text style={[styles.tabText, isSigningUp && styles.activeTabText]}>
            Sign-up
          </Text>
        </TouchableOpacity>
      </View>

      {(isSigningUp || !isVerifying) && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </>
      )}
      {isVerifying && (
        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>
          {isVerifying ? "Verify" : isSigningUp ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>

      {!isSigningUp && !isVerifying && (
        <TouchableOpacity
          onPress={() => {
            // TODO: Add forgot password logic
          }}
        >
          <Text style={styles.forgotPassword}>Forgot passcode?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#FA4A0C",
  },
  tabText: {
    fontWeight: "bold",
    color: "#bbbbbb",
  },
  activeTabText: {
    color: "#FA4A0C",
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderColor: "#cccccc",
    padding: 10,
    borderBottomWidth: 1,
  },
  nextButton: {
    backgroundColor: "#FA4A0C",
    width: 314,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: "center",
    color: "#FA4A0C",
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default SignUpScreen;
