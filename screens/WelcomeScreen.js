import { StyleSheet, Text, View, P } from 'react-native';
import {useAuthContext} from "../hooks/useAuthContext";
import FlatButton from "../components/ui/FlatButton";
import {Colors} from "../constants/styles";

function WelcomeScreen() {
  const {logout} = useAuthContext();

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>

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
