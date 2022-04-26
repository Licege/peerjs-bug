import { useEffect, useState } from 'react';
import Peerjs from 'peerjs';
import Config from '../config';

export function usePeer() {
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const peer = new Peerjs(Config);

    peer.on('open', () => {
      setPeer(peer);
    })

  }, []);

  return peer;
}