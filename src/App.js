import {useState, useRef} from "react";
import './App.css';
import firebase from './firebase_config';
import 'firebase/auth';
import 'firebase/firestore';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
    const [user] = useAuthState(auth)
    return (
        <div className="App">
            <header>
                <h1>💬</h1>
                <SignOut/>
            </header>
            <section>
                {user ? <ChatRoom/> : <SignIn/>}
            </section>
        </div>
    );
}


function SignIn() {
    const signInWithGoogleProvider = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <button className="sign-in" onClick={signInWithGoogleProvider}>Sign in</button>
    )
}

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>sign out</button>
    )
}

function ChatRoom() {
    const message_ref = firestore.collection("chat_messages")
    const query = message_ref.orderBy("createdAt")

    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('')

    const dummy = useRef()
    const sendMessage = async (e) => {
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser;
        if (formValue === '') return;
        await message_ref.add({
            text: formValue,
            uid,
            photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        setFormValue('');

        dummy.current.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <>
            <main>
                {messages !== undefined && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
                <div ref={dummy}/>
            </main>
            <form onSubmit={sendMessage} className="form">
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type="submit"><i className="material-icons">send</i></button>
            </form>
        </>
    )
}

function ChatMessage(props) {
    const {text, uid, photoURL} = props.message

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt="user-pic"/>
            <p>{text}</p>
        </div>
    )

}

export default App;
