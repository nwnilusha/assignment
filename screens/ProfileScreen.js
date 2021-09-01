import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import SignatureView from "react-native-signature-canvas";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const signatureRef = useRef(null);
  const [text, setText] = useState("");

  const [textInputName, setName] = useState("");
  const [textInputNIC, setNIC] = useState("");
  const [textInputAddress, setAddress] = useState("");

  //Validating text inputs for text availability
  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!textInputName.trim()) {
      alert("Please Enter Name");
      return;
    }
    //Check for the NIC TextInput
    if (!textInputNIC.trim()) {
      alert("Please Enter NIC Number");
      return;
    }

    //Check for the numbers count inside TextInput
    if (textInputNIC.length != 12) {
      alert("Please Enter Correct NIC Number");
      return;
    }

    //Check for the address TextInput
    if (!textInputAddress.trim()) {
      alert("Please Enter Address");
      return;
    }
    //Checked Successfully
    //Do whatever you want
    return true;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.inputContainer}>
          <View style={styles.section}>
            <Text>Name : </Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="default"
              placeholder="e.g. Nilusha Wimalasena"
              onChangeText={(val) => setName(val)}
            />
          </View>
          <View style={styles.section}>
            <Text>NIC : </Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="numeric"
              placeholder="e.g. 861711374"
              onChangeText={(val) => setNIC(val)}
              maxLength={12}
            />
          </View>
          <View style={styles.section}>
            <Text>Address : </Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="default"
              placeholder="e.g. No 7, Nawala, Koswaththa."
              onChangeText={(val) => setAddress(val)}
            />
          </View>

          <Text>
            Name : {textInputName} , NIC : {textInputNIC}, Address :{" "}
            {textInputAddress}
          </Text>
        </View>

        <SignatureView
          style={{
            borderWidth: 2,
            height: 200,
          }}
          ref={signatureRef}
          // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
          onOK={(val) => {
            //  a base64 encoded image

            if (checkTextInput() == true) {
              let data = {
                names: textInputName,
                nic: textInputNIC,
                addressData: textInputAddress,
                email: user.email,
                signature: val,
              };
              navigation.push("Fingerprint", data);
            }
          }}
          onClear={() => {
            console.log("cleared signature");
            setText("");
          }}
        />
        <View style={styles.alertContainer}>
          <Text>Please press 'Confirm' button to progress !</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 30,
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flexDirection: "column",
    padding: 10,
  },
  textInputStyle: {
    width: "100%",
    height: 40,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    marginTop: 15,
  },
  detailsView: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
