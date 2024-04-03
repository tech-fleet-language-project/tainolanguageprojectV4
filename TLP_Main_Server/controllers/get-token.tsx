const admin = require('firebase-admin');
// import admin from 'firebase-admin';

export default function getAccessToken() {
  return admin.credential
		.applicationDefault()
		.getAccessToken()
    .then((accessToken: { access_token: string; }) => {
			return accessToken.access_token;
		})
		.catch((error: string) => {
			console.error('Unable to get access token');
			console.error(error);
		});
}
