import {useState, useRef} from "react";
import './App.css';
import firebase from './firebase_config';
import 'firebase/auth';
import 'firebase/firestore';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
    const [user] = useAuthState(auth)

    const [person, selectPerson] = useState('')

    return (
        <div className="App">
            <header>
                <h1>💬</h1>
                <SignOut/>
            </header>
            <section>
                {user ? person === '' ? <UsersPortal selectPerson={selectPerson}/> : <ChatRoom person={person} selectPerson={selectPerson}/> :
                    <SignIn/>}
            </section>
        </div>
    );
}


function SignIn() {
    const signInWithGoogleProvider = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(res => {
            let userDetails = res.user;
            let users_ref = firestore.collection("users")
            console.log(userDetails)
            users_ref.where("uid", "==", userDetails.uid).get()
                .then(function (querySnapshot) {
                    if (!querySnapshot.empty) {
                        console.log("Existed user");
                    } else {
                        console.log("New User");
                        users_ref.add({
                            uid: userDetails.uid,
                            photoURL: userDetails.photoURL,
                            userName: userDetails.displayName,
                            mailId: userDetails.email,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => console.log("user added"))
                    }
                });
        });
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

function UsersPortal(props) {

    const users_query = firestore.collection("users").orderBy("createdAt")
    const [users] = useCollectionData(users_query, {idField: 'id'});

    const selectUser = (e) => {
        props.selectPerson(e.target.value)
    }
    return (
        <>
            <Form.Control
                as="select"
                className="select-user"
                onChange={selectUser}
            >
                <option value=''>Please Select User</option>
                {users !== undefined && users.map(user => {
                    if (user.uid === auth.currentUser.uid) return ''
                    return <option key={user.id} value={user.uid}>{user.userName}</option>
                })
                }
            </Form.Control>
        </>
    )
}

function ChatRoom(props) {
    const message_ref = firestore.collection("chat_messages")
    let query = {}
    query = message_ref.where("convo", "in", [auth.currentUser.uid + props.person, props.person + auth.currentUser.uid])
        .orderBy("createdAt")

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
            sender: uid,
            receiver: props.person,
            photoURL,
            convo: uid + props.person,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        setFormValue('');

        dummy.current.scrollIntoView({behavior: 'smooth'})
    }

    const onSelectBack = () => {
        props.selectPerson('')
    }

    return (
        <>
            <main>
                {messages !== undefined && messages.map(msg =>
                    <ChatMessage key={msg.id} message={msg}/>)
                }
                <div ref={dummy}/>
            </main>
            <form onSubmit={sendMessage} className="form">
                <button onClick={onSelectBack}><i className="material-icons">arrow_back</i></button>
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
            <div>{text}</div>
        </div>
    )

}

export default App;
