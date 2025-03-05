import { useState, useRef, useEffect, useReducer } from 'react';

const BrowserSpeechRecognition =
  window &&
  (window.SpeechRecognition ||
    window['webkitSpeechRecognition'] ||
    window['mozSpeechRecognition'] ||
    window['msSpeechRecognition'] ||
    window['oSpeechRecognition']);

function createRecognition() {
  const result = new BrowserSpeechRecognition();
  result.interimResults = true;
  result.maxAlternatives = 1;
  return result;
}

function concat(...transcripts) {
  return transcripts
    .map((x) => x.trim())
    .filter((x) => x)
    .join(' ');
}

function getTranscript(speechRecognitionResultList, predicate) {
  const result = [];
  for (let i = 0; i < speechRecognitionResultList.length; i++) {
    if (!predicate(speechRecognitionResultList[i])) continue;
    result.push(speechRecognitionResultList[i][0].transcript);
  }
  return concat(...result);
}

const initialState = { final: '', transcript: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'UpdateFinalTranscript':
      return { ...state, final: concat(state.final, action.final) };
    case 'UpdateTransientTranscript':
      return { ...state, transcript: concat(state.final, action.transient) };
    case 'ClearTranscript':
      return initialState;
    default:
      throw new Error();
  }
}

export function useSpeechRecognition() {
  const recognition = useRef(
    BrowserSpeechRecognition ? createRecognition() : null,
  );
  const browserSupportsSpeechRecognition = recognition.current !== null;
  const [listening, setListening] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    function handleResult(event) {
      const final = getTranscript(event.results, (x) => x.isFinal);
      dispatch({ type: 'UpdateFinalTranscript', final });
      const transient = getTranscript(event.results, (x) => !x.isFinal);
      dispatch({ type: 'UpdateTransientTranscript', transient });
    }

    function handleEnd() {
      setListening(false);
    }

    const r = recognition.current;
    r.addEventListener('result', handleResult);
    r.addEventListener('end', handleEnd);
    return () => {
      r.removeEventListener('result', handleResult);
      r.removeEventListener('end', handleEnd);
    };
  }, [browserSupportsSpeechRecognition]);

  function startListening() {
    dispatch({ type: 'ClearTranscript' });
    setListening(true);
    recognition.current.start();
  }

  return {
    browserSupportsSpeechRecognition,
    transcript: state.transcript,
    startListening: browserSupportsSpeechRecognition
      ? startListening
      : () => {},
    listening,
  };
}
