// const mongoose = require('mongoose');
// const { Schema, model } = mongoose;

import {Schema, model} from 'mongoose';

export interface IUser {
  user_id: string;
  firebase_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  admin: boolean;
  user_agreement: boolean;
  timestamp?: boolean;
}

export const user = new Schema<IUser>({
  user_id: {
    type: String,
    unique: true,
    required: [true, 'Error user id is required.'],
  },
  firebase_id: {
    type: String,
    unique: true,
    required: [true, 'Error firebase id  is required.'],
  },
  first_name: {
    type: String,
    required: [true, 'Error first name is required.'],
  },
  last_name: {
    type: String,
    required: [true, 'Error last name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Error email is required.'],
    unique: true,
  },
  // password may be saved in Firestore or in DB or online server
  password: {
    type: String,
    required: [true, 'Error password is required.'],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  user_agreement: {
    type: Boolean,
    default: false,
  },
  timestamp: true,
});

export const userProfile = model<IUser>('userProfile', user);
// push to DB error log

// module.exports = userProfile;]


// how do I make this function generic allowing for any argument of type schema: 
// normalize function in this file to bind, or assign, values to schema and pass to to other function to save to database 
// also perform other functions i.e. delete, query, etc.
const handleDBSave = (user: IUser) => {
  try {
  const userprofile = new userProfile({
    user_id: user.user_id,
    firebase_id: user.firebase_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
    admin: user.admin,
    user_agreement: user.user_agreement,
    timestamp: user.timestamp,
  });
  userprofile.save();
}
catch(error: any) {
  console.log("Data failed to save to database", error)
}
};
