import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider from "./store/auth-context";
import {useAuthContext} from "./hooks/useAuthContext";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.primary100 },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
    const { isAuthenticated} = useAuthContext();

    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack/>}
        </NavigationContainer>
    );
}

const Root = () => {
    const { authenticate, isAuthenticated } = useAuthContext();
    const fetchToken = async () => {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
            authenticate(storedToken);
        }
    }

    useEffect(() => {
        fetchToken();
    }, []);

    return <Navigation />;

}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
        <AuthContextProvider>
            <Root />
        </AuthContextProvider>
    </>
  );
}
