import { useCallback, useEffect, useState } from 'react';
import { usePeer } from './hooks/usePeer';
import { createMediaStream } from './helpers/createMediaStream';
import Card from './components/Card';
import './App.css';

function App() {
  const myPeer = usePeer();
  const [targetPeerId, setTargetPeerId] = useState('');
  const [myStream, setMyStream] = useState(null);
  const [interlocutorStream, setInterlocutorStream] = useState(null);
  const [hasActiveCall, setHasActiveCall] = useState(false);

  const createMyStream = async () => {
    if (myStream) return myStream;

    const myMedia = await createMediaStream();

    setMyStream(myMedia);

    return myMedia;
  }

  const call = useCallback(async () => {
    if (!myPeer?.id) return;

    const myMedia = await createMyStream();

    const call = myPeer.call(targetPeerId, myMedia);

    call.on('stream', remoteStream => {
      setInterlocutorStream(remoteStream);
      setHasActiveCall(true);
    });
  }, [myPeer?.id, targetPeerId]);

  useEffect(() => {
    if (!myPeer?.id) return;

    myPeer.on('call', async incomingCall => {
      const myMedia = await createMyStream();

      incomingCall.answer(myMedia);

      incomingCall.on('stream', remoteStream => {
        setInterlocutorStream(remoteStream);
        setHasActiveCall(true);
      });
    })
  }, [myPeer?.id]);

  return (
    <div className="App">
      {myPeer?.id ? <div>{`Your peerId is: ${myPeer.id}`}</div> : null}

      {!hasActiveCall && (
        <div>
          <input value={targetPeerId} onChange={event => setTargetPeerId(event.target.value)}/>
          <button disabled={!targetPeerId} onClick={call}>Connect</button>
        </div>
      )}

      <div>
        {myStream ? <Card stream={myStream} isMyStream /> : null}
        {interlocutorStream ? <Card stream={interlocutorStream} /> : null}
      </div>
    </div>
  );
}

export default App;
