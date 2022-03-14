let hasInit = false;
let db;
let realtimeDB;
let storageRef;
let id;
let fbId;
const firebaseConfig = {
	apiKey: "AIzaSyDEEQ5AfU_jTHRpPKaZGJ7Av7WgoiJ9fhU",
	authDomain: "pmint05-lov3.firebaseapp.com",
	databaseURL:
		"https://pmint05-lov3-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "pmint05-lov3",
	storageBucket: "pmint05-lov3.appspot.com",
	messagingSenderId: "80065986528",
	appId: "1:80065986528:web:4cda1df6b2f0451a487585",
	measurementId: "G-R815PC71SX",
};
if (!hasInit) {
	firebase.initializeApp(firebaseConfig);
	db = firebase.firestore();
	realtimeDB = firebase.database().ref();
	storageRef = firebase.storage().ref();
	hasInit = true;
	realtimeDB
		.child("id")
		.get()
		.then((snapshot) => {
			id = snapshot.val();
		});
	realtimeDB.child("fbId").on("value", (snapshot) => {
		fbId = snapshot.val();
	});
}
