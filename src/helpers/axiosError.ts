import { isAxiosError } from "axios";
import { Alert } from "react-native";


export const showErrorMessage = (error: unknown) => {
    if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        Alert.alert('Error', `${errorMessage}`, [{ text: 'Ok' }], { cancelable: true });
    } else {
        console.log(error)
    }
}