import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { useSpeechRecognition } from '../../hooks/useSpeech';
import { Buffer } from 'buffer';

function AudioPromptPage() {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const speech = useSpeechRecognition();
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [playbackUrl, setPlaybackUrl] = useState(null);

  // Add new state for transcript
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // console.log('User:', user);
  }, [user]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //ADDTOFIXPLAY
  const createPlayableAudio = (blob) => {
    return new Blob(blob, { type: 'audio/webm' });
  };

  const handleStartRecording = async () => {
    speech.startListening();
    setIsRecording(true);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/x-matroska;codecs=avc1',
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'video/x-matroska;codecs=avc1',
        });

        // Create a playable version of the blob
        const playableBlob = createPlayableAudio(audioChunksRef.current);

        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);

        setPlaybackUrl(URL.createObjectURL(playableBlob));
      };

      mediaRecorder.start();
    } catch (err) {
      console.error('Error accessing the microphone: ', err);
      setError('Error accessing the microphone');
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsRecording(false);

      // Use the transcript from speech recognition
      setTranscript(speech.transcript);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      handleStopRecording();
      return;
    }
    await handleStartRecording();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioUrl) {
      setError('Please record audio first');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const audioBlob = await fetch(audioUrl).then((r) => r.blob());
      const soundFile = new File([audioBlob], 'recording.mp3', {
        type: 'video/x-matroska;codecs=avc1',
      });
      const formData = new FormData();
      // formData.append('soundURL', audioBlob, 'recording.mp4');
      formData.append('soundURL', soundFile);
      formData.append('transcript', transcript);

      const storedToken = localStorage.getItem('authToken');
      await axios.post('http://localhost:5005/dream-audio', formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-type': 'multipart/form-data',
        },
      });

      // Reset form
      setAudioUrl(null);
      setTranscript('');
      setLoading(false);
    } catch (error) {
      setError('Error saving recording');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[55vh] mx-auto">
      {/* <button onClick={speech.startListening}>
        Listen <i className="fa fa-microphone" />
      </button> */}
      <p>
        <code>transcript:</code>
        <input
          type="text"
          readOnly
          value={speech.transcript}
          style={{ width: '100%' }}
        />
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full mb-4 border border-indigo-200 rounded-lg bg-indigo-100 dark:bg-indigo-700 dark:border-indigo-600"
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-indigo-200 dark:border-indigo-600">
          <h2 className="text-xl font-semibold">Audio or Text Prompt</h2>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2 text-indigo-600 rounded-sm cursor-pointer hover:text-indigo-700 hover:bg-indigo-200 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-600 ${
              isRecording ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>

          {audioUrl && (
            <audio controls>
              <source src={playbackUrl} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>

        <textarea
          className="w-full h-60 lg:h-20 p-3 bg-indigo-50 border-none rounded-lg dark:bg-indigo-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Or write your prompt here..."
          value={text}
          onChange={handleTextChange}
        ></textarea>

        {error && <div className="text-red-500 mt-2">{error}</div>}

        <div className="flex justify-end p-2">
          <button
            type="submit"
            className={`bg-indigo-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AudioPromptPage;
