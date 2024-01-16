import { StyleSheet, Text, View, Alert } from 'react-native';
import {useAuthContext} from "../hooks/useAuthContext";
import FlatButton from "../components/ui/FlatButton";
import {Colors} from "../constants/styles";
import {useEffect, useState} from "react";
import axios from "axios";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function WelcomeScreen() {
  const { token } = useAuthContext();

  const {logout} = useAuthContext();
  const [fetchedMessage, setFetchedMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Initiate loading
    axios.get(`https://react-native-course-704e8-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${token}`)
        .then((response) => {
          setFetchedMessage(response.data);
          }
        )
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
      Alert.alert("A problem has occurred!", "We could not fetch your data. Please try again later.");
      console.log(err.message);
    })
  }, []);

  if (isLoading) {
    return <LoadingOverlay message={"Loading..."} />
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>

      {/* Fetched message */}
      <Text style={{color: Colors.primary800, fontSize: 20, marginVertical: 10}}>{fetchedMessage}</Text>

      <View style={styles.buttons}>
        <FlatButton textStyle={styles.buttonText} style={styles.button} onPress={logout}>Logout</FlatButton>
      </View>

    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttons: {
    marginTop: 18,
  },
  button: {
    borderRadius: 4,
    backgroundColor: Colors.primary500,
    width: 100,
    height: 45,
    justifyContent: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },
});
