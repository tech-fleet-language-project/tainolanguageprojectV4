import {initializeApp} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  connectAuthEmulator,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';
import {default as FirebaseConfig} from '../config/Firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config/AndroidURL';

// expo-constant?
// firestore to store user data?

// TODO: Add SDKs for Firebase products that want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// your web app's Firebase configuration
// for Firebase JS SDK v7.20.0 and later, measurementId is optional
type firebaseconfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL: string;
  measurementId: string;
};



// manifest.extra
// firebase config parameters
const firebaseConfig: firebaseconfig = {
  apiKey: FirebaseConfig.apiKey,
  authDomain: FirebaseConfig.authDomain,
  projectId: FirebaseConfig.projectId,
  storageBucket: FirebaseConfig.storageBucket,
  messagingSenderId: FirebaseConfig.messagingSenderId,
  appId: FirebaseConfig.appId,
  databaseURL: FirebaseConfig.databaseURL,
  measurementId: FirebaseConfig.measurementId,
};

/**
 * initialize firebase
 * @params {Object} firebaseConfig - the parameters to config firebase
 * @function
 */

// expect error - Firebase: Error(auth/already-initialized).
// most likely because the state is persisted: suspend error?
const fireApp = initializeApp(firebaseConfig);

export const auth = getAuth(fireApp);
// initialize auth
// export const auth = initializeAuth(fireApp, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
connectAuthEmulator(auth, BASE_URL);
export const analytics = getAnalytics(fireApp);
export const database = getFirestore(fireApp);
