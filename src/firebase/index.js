import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyATgPC9HmyH3aFCL45JgV5yHdvHgoyr-ak',
	authDomain: 'chatty-bb127.firebaseapp.com',
	databaseURL: 'https://chatty-bb127-default-rtdb.firebaseio.com',
	projectId: 'chatty-bb127',
	storageBucket: 'chatty-bb127.appspot.com',
	messagingSenderId: '566026886175',
	appId: '1:566026886175:web:68963b600a6caae352c92a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
