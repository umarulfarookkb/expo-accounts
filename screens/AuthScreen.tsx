import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
const myImage = require("../assets/login.png");

export const Auth = ({ onAuthenticate }) => {
  return (
    <View style={styles.container}>
      <Image source={myImage} style={styles.image} />
      <Text style={styles.title}>അകൗണ്ടിലേക് ഇടാം</Text>

      <TouchableOpacity onPress={onAuthenticate} style={styles.btn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  btn: {
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0893FC",
    padding: 10,
    borderRadius: 25,
  },
  image: {
    width: 200,
    height: 161,
    aspectRatio: 3 / 3,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 30,
    textAlign: "center",
  },
});
