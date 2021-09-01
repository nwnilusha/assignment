import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";

const LoginScreen = ({ navigation }) => {
  var access_token = "";
  var email_address = "";

  //Google login
  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: `740157566387-vv9eo15tbl9084j5m212ks16g28dbhh5.apps.googleusercontent.com`,
        androidClientId: `740157566387-asuu7pua951gs5kb3evvmt4f17ik4pbr.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        access_token = accessToken;
        email_address = user.em;
        console.log(
          "LoginScreen.js 17 | success, navigating to profile : ",
          access_token
        );
        navigation.navigate("Profile", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.styledButton}>
        <Button title="Sign in with Google" onPress={signInAsync} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  styledButton: {
    padding: 5,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 2,
    height: 60,
  },
});
