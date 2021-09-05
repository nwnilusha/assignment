import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

const DocumentScreen = ({ route, navigation }) => {
  const data = route.params;
  //console.log("Signature data : ", data.signature);
  console.log("Fingerprint data : ", data.fingerprint);
  //Generate a odf file from a HTML
  const createPDF = async () => {
    const results = {
      html:
        "<h2>User Details</h2><form><label for=name>Customer Name :</label><input type=text id=name value=" +
        data.names +
        "><br><label for=name>NIC Number :</label><input type=text id=name value=" +
        data.nic +
        "><br><label for=name>Address :</label><input type=text id=name value=" +
        data.addressData +
        "><br><br><br></form><label for=name>Signature :</label><br><img src=" +
        data.signature +
        " height=300 width=300><br><br><label for=name>Fingerprint :</label><br><img src=" +
        data.fingerprint +
        " height=400 width=400>",

      fileName: "User Data",
      base64: true,
    };

    //Generate the PDF file
    const response = await Print.printToFileAsync((html = results));

    //Compose an email to user
    const mailResponse = await MailComposer.composeAsync({
      subject: "User Details",
      recipients: [data.email],
      attachments: [response.uri],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.styledButton}>
        <Button title="Email user details" onPress={createPDF} />
      </View>
    </View>
  );
};

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  styledButton: {
    padding: 5,
    backgroundColor: "greenyellow",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 2,
    height: 60,
  },
});
