import React from "react";
import { Alert } from "react-native";
import AuthContent from '../components/Auth/AuthContent';

import {createUser} from "../utilities/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

// hooks
import {useAuthContext} from "../hooks/useAuthContext";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const { authenticate } = useAuthContext();
  const signupHandler = async ({email, password}) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);

    } catch (err) {
      Alert.alert(
          "Authentication failed!",
          "Could not create user. Please check your credentials or try again later."
      );
    }
    setIsAuthenticating(false);
  }

  return (
      isAuthenticating ?
          <LoadingOverlay message={"Creating user..."}/> :
          <AuthContent onAuthenticate={signupHandler}/>
  );
}

export default SignupScreen;
