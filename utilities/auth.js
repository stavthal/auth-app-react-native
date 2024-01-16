import axios from "axios";
import { API_KEY } from '@env';

// hooks
import {useStorage} from "../hooks/useStorage";

export const createUser = async (email, password) => {
    const { storeData, getData } = useStorage();

    const response = await axios.post(
       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true,
            }
        );
    const token = response.data.idToken;

    // Storing the token
    await storeData('token', token);

    return token;
}

export const loginUser = async (email,password) => {
    const { storeData, getData } = useStorage();

    const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );

    const token = response.data.idToken;

    // Storing the token
    await storeData('token', token);

    return token;
}
