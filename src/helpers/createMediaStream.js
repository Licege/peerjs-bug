async function getUserMedia({ video = true, audio = true } = {}) {
  return navigator.mediaDevices.getUserMedia({ video, audio });
}

export async function createMediaStream() {
  try {
    return await getUserMedia({ video: true, audio: true });
  } catch (_) {
    try {
      return await getUserMedia({ video: false });
    } catch (_0) {
      try {
        return await getUserMedia({ video: true, audio: false });
      } catch (e) {
        console.error('Failed to get local stream', e);

        return null;
      }
    }
  }
}