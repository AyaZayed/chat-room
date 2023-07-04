import './css/App.css'
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ChatRoom from './components/ChatRoom';

import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRmgMIA5mjYmmnXMh0n9KttERcLI7EnvA",
  authDomain: "chat-room-a1189.firebaseapp.com",
  projectId: "chat-room-a1189",
  storageBucket: "chat-room-a1189.appspot.com",
  messagingSenderId: "484964532134",
  appId: "1:484964532134:web:62717b456491dd8f4f1967",
  measurementId: "G-2389C90JS7"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const logo = new URL('../public/logo.svg', import.meta.url);

export default function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
        <SignOut auth={auth} />
      </header>
      <section>
        {user ? <ChatRoom firestore={firestore} auth={auth} useCollectionData={useCollectionData} firebase={firebase} /> : <SignIn auth={auth} />}
      </section>
    </div>
  )
}

