import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

const DocumentScreen = ({ route, navigation }) => {
  const data = route.params;

  console.log("Fingerprint : ", data.signature);

  //Generate a odf file from a HTML
  const createPDF = async () => {
    const results = {
      html:
        "<h1>Personal details document</h1><h2>User Informations</h2><h3>Name : </h3><h3>" +
        data.names +
        "</h3><h3>NIC Number : </h3><h3>" +
        data.nic +
        "</h3><h3>Adress : </h3><h3>" +
        data.addressData +
        "</h3><h3>Signature : </h3><h3>" +
        data.signature +
        "</h3><h3>Fingerprint : </h3><h3>" +
        data.fingerprint +
        "</h3>",
      // html:
      //   "<html><body><div class='title-container'><img source=$" +
      //   data.signature +
      //   "/></div></body></html>",
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
