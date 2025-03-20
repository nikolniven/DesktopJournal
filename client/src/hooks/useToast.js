import React from 'react';

import { toast } from 'react-toastify';

export function useToast() {
  const onSuccess = (message) =>
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: 'success',
    });

  const onError = (message) =>
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: 'error',
    });

  return { onSuccess, onError };
}
