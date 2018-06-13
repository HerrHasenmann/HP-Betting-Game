var app = angular.module("app", ["ngMaterial", "md.data.table", "angular-toArrayFilter", "ngRoute", "ngMessages", "firebase", "angularMoment", "pascalprecht.translate"]);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1e6JS-gP702LzKWsGCDXwu6lSk0HUZFA",
    authDomain: "hp-betting-game.firebaseapp.com",
    databaseURL: "https://hp-betting-game.firebaseio.com",
    projectId: "hp-betting-game",
    storageBucket: "hp-betting-game.appspot.com",
    messagingSenderId: "189139009611"
};
firebase.initializeApp(config);

var firestore = firebase.firestore();

var settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);