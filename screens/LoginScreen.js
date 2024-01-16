import React from "react";
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';

import {loginUser} from "../utilities/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

// hooks
import { useAuthContext} from "../hooks/useAuthContext";


function LoginScreen({navigation}) {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const { authenticate , isAuthenticated} = useAuthContext();

  const loginHandler = async ({email, password}) => {
    setIsAuthenticating(true);
    try {
      const authToken = await loginUser(email, password);
      authenticate(authToken); // Save the token

    } catch (err) {
      Alert.alert(
          "Authentication failed!",
          "Could not log you in. Please check your credentials or try again later..."
      );
      setIsAuthenticating(false); // stops the loader from being visible
    }

  }



  if (isAuthenticating){
    return <LoadingOverlay message={"Logging in..."} />
  }

   return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
