import { Platform } from "react-native";


// to use Firebase simulator from Android device
export const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:9099' : 'http://localhost:9099';
