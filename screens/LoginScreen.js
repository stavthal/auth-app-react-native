import React from "react";
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';

import {loginUser} from "../utilities/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";


function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const loginHandler = async ({email, password}) => {
    setIsAuthenticating(true);
    try {
      const response = await loginUser(email, password);
      console.log(response.data.idToken);
    } catch (err) {
      Alert.alert(
          "Authentication failed!",
          "Could not log you in. Please check your credentials or try again later..."
      );
    }
    setIsAuthenticating(false); // stops the loader from being visible
  }



  return (
      isAuthenticating ?
          <LoadingOverlay message={"Logging in..."} />
          :
          <AuthContent isLogin onAuthenticate={loginHandler} />
  );
}

export default LoginScreen;
