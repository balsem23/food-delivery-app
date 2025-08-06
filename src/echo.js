import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

let echoInstance = null;

export function initializeEcho(token = null) {
  if (echoInstance) return echoInstance;

  echoInstance = new Echo({
    broadcaster: 'reverb',
    key: process.env.REACT_APP_REVERB_APP_KEY || 'local',
    wsHost: process.env.REACT_APP_REVERB_HOST || '127.0.0.1',
    wsPort: process.env.REACT_APP_REVERB_PORT || 8080,
    forceTLS: (process.env.REACT_APP_REVERB_SCHEME || 'http') === 'https',
    enabledTransports: ['ws'],

    // Auth config (only if token is passed)
    ...(token && {
      authEndpoint: `${process.env.REACT_APP_BACKEND_URL}/api/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }),
  });

  window.Echo = echoInstance;
  return echoInstance;
}
