import { SecureRoutes } from '../../hoc/SecureRoutes';

import useAuth from '../../hooks/useAuth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useRef, useState } from 'react';

firebase.initializeApp({
    apiKey: "AIzaSyCXUDb8usNHFOxmAJPqqiQzcF_MVlgKWJs",
    authDomain: "profiletomemessenger.firebaseapp.com",
    projectId: "profiletomemessenger",
    storageBucket: "profiletomemessenger.appspot.com",
    messagingSenderId: "42920312064",
    appId: "1:42920312064:web:d3bbc6b63901aaf26e07e5",
    measurementId: "G-XKEB8053T4"
});

const firestore = firebase.firestore();

const Chat = () => {

    const { auth } = useAuth();

    return (
        <section>
            {<ChatRoom auth={auth} />}
        </section>
    )
};

function ChatRoom(props) {

    const auth = props.auth;

    const dummy = useRef();

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit('25');

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        if (formValue !== '') {
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: auth._id,
                photoURL: auth.profileImg
            });
        }

        setFormValue('');

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>

            <div ref={dummy}></div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

                <button type='submit'>Send</button>
            </form>
        </>
    )

};

function ChatMessage(props) {

    const { auth } = useAuth();

    const { text, uid, photoUrl } = props.message;

    const messageClass = uid === auth._id ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoUrl} />
            <p>{text}</p>
        </div>
    )
}

export default SecureRoutes(Chat);