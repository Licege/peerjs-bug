import { useLayoutEffect, useRef } from 'react';

const Card = ({ stream, isMyStream }) => {
  const videoRef = useRef();

  useLayoutEffect(() => {
    if (videoRef?.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video ref={videoRef} autoPlay playsInline muted={isMyStream} style={{ border: '2px solid' }} />
  );
};

export default Card;