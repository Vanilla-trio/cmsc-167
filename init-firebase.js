//import * as firebase from "firebase";
var app_firebase = {};
(function(){
	const firebaseConfig = {
	  apiKey: "AIzaSyDU5NLP4rA9gv11LBz9cqaFUDaiVU35L-w",
	  authDomain: "centoga-395e3.firebaseapp.com",
	  databaseURL: "https://centoga-395e3.firebaseio.com",
	  projectId: "centoga-395e3",
	  storageBucket: "centoga-395e3.appspot.com",
	  messagingSenderId: "154530634577",
	  appId: "1:154530634577:web:d75ddf7416cf45fce4d170",
	  measurementId: "G-D5GCN70YJB"
	};
	 
	firebase.initializeApp(firebaseConfig);

    app_firebase = firebase;
})()
//export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();