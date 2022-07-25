import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD3YN0iXXHyqhlLKWFAHhH8Ew6Knb0-esk',
	authDomain: 'todo-81155.firebaseapp.com',
	projectId: 'todo-81155',
	storageBucket: 'todo-81155.appspot.com',
	messagingSenderId: '923493279437',
	appId: '1:923493279437:web:de98ebcf6ae500fed22b84',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
