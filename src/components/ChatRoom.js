import React from 'react'

export default function ChatRoom({ firestore, useCollectionData, auth, firebase }) {
    const ref = React.useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        const { value } = ref.current;
        await messagesRef.add({
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });
        ref.current.value = '';
        setInputValue('');
    }

    const [inputValue, setInputValue] = React.useState('');

    return (
        <div className='chatroom'>
            <div className='messages'>
                {messages && messages.map(msg => <div key={msg.id}
                    className={`msg ${msg.uid === auth.currentUser.uid ? 'sent' : 'received'}`} >
                    <img src={msg.photoURL} alt='profile' />
                    <p>{msg.text}</p>
                </div>)}
            </div>
            <form onSubmit={sendMessage}>
                <input ref={ref} type='text' value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} placeholder='Say something...' />
                <button type='submit' disabled={!inputValue}>+</button>
            </form>
        </div>
    )
}
