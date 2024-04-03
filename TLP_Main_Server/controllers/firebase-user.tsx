import {User} from 'firebase/auth';
import {auth} from './firebase.init';

// generate user profile data for settings, workers, and other purposes

// type userinfo = {
//   displayname: string;
//   email: string;
//   photoUrl: string;
//   phoneNumber: string;
//   emailVerified: string;
// };

const user: User | null = auth.currentUser;

export default function handleUserProfile() {
  try {
    if (user !== null) {
      // the user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // the user's ID, unique to the Firebase project...do NOT use
      // this value to authenticate with your backend server, if
      // you have one...use User.getToken() instead.
      //const uid = user.uid;
      const uid = user.getIdToken;
      console.log('User profile is provided');
      return uid;
    }
  } catch (error) {
    console.error(error);
  }
}
