import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, value);
    } catch (error) {
        console.error(error.message);
    }
}

const getData = async (value) => {
    let data;
    try {
        data = await AsyncStorage.getItem(value);

    } catch (error) {
        console.error(error.message);
    }
    return data;
}

const removeData = async (value) => {
    try {
        await AsyncStorage.removeItem(value);
    } catch (error) {
        console.error(error.message);
    }
}

export const useStorage = () => {
    return {
        getData,
        storeData,
        removeData,
    }
}
