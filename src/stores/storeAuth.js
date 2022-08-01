import { defineStore } from 'pinia';
import { auth } from '@/firebase/index';

import {
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

export const useStoreAuth = defineStore({
	id: 'storeAuth',
	state: () => {
		return {
			user: {},
		};
	},
	actions: {
		init() {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					this.user.id = user.uid;
					this.user.email = user.email;
					// ...
				} else {
					this.user = {};
				}
			});
		},
		registerUser(credentials) {
			createUserWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			)
				.then((userCredential) => {
					const user = userCredential.user;
				})
				.catch((error) => {
					console.log(error.code);
					console.log(error.message);
				});
		},
		logoutUser() {
			signOut(auth)
				.then(() => {
					console.log('sign out succesfull');
				})
				.catch((error) => {
					console.log(error);
				});
			window.location.reload();
		},
		loginUser(credentials) {
			console.log('login', credentials);

			signInWithEmailAndPassword(auth, credentials.email, credentials.password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;

					console.log('user logged in', user);
					window.location.reload();
				})

				.catch((error) => {
					alert('Invalid credentials');
					const errorCode = error.code;
					const errorMessage = error.message;
				});
			// window.location.reload();
		},
	},
});
