import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[OAuthCallback] Mounted');

    const hash = window.location.hash;
    console.log('[OAuthCallback] window.location.hash:', hash);

    if (hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      console.log('[OAuthCallback] Extracted token:', token);

      if (token) {
        localStorage.setItem('dropbox_token', token);
        console.log('[OAuthCallback] Token saved. Redirecting to ViewAbstracts...');

        // Clean up hash and redirect
        window.location.replace('/star-app/ViewAbstracts');
      } else {
        console.error('[OAuthCallback] Token not found in URL hash.');
      }
    } else {
      console.warn('[OAuthCallback] access_token not found in URL hash.');
    }
  }, []);

  return <p>Processing Dropbox login...</p>;
};

export default OAuthCallback;
