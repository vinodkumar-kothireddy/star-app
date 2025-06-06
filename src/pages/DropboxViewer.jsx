import React, { useEffect, useState } from 'react';
import './DropboxViewer.css';

const DropboxViewer = () => {
  const [token, setToken] = useState(null);
  const [files, setFiles] = useState([]);
  const [metadataMap, setMetadataMap] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 🔹 NEW

  useEffect(() => {
    const storedToken = localStorage.getItem('dropbox_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchFiles = async () => {
      try {
        setLoading(true); // 🔹 Start loading
        setError('');
        const listRes = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: '' }),
        });

        if (!listRes.ok) {
          const errData = await listRes.json();
          setError(`Error listing files: ${errData.error_summary || listRes.statusText}`);
          return;
        }

        const listData = await listRes.json();
        const allFiles = listData.entries || [];
        const mainFiles = allFiles.filter(f => !f.name.includes('_metadata.json'));
        const metaFiles = allFiles.filter(f => f.name.includes('_metadata.json'));

        const metaMap = {};
        for (const metaFile of metaFiles) {
          const metaRes = await fetch('https://content.dropboxapi.com/2/files/download', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Dropbox-API-Arg': JSON.stringify({ path: metaFile.path_lower }),
            },
          });

          if (!metaRes.ok) continue;

          const text = await metaRes.text();
          try {
            const metaJson = JSON.parse(text);
            const baseName = metaFile.name.replace('_metadata.json', '');
            metaMap[baseName] = metaJson;
          } catch {
            // ignore parse errors
          }
        }

        setFiles(mainFiles);
        setMetadataMap(metaMap);
      } catch (e) {
        setError('Failed to fetch files.');
        console.error(e);
      } finally {
        setLoading(false); // 🔹 Done loading
      }
    };

    fetchFiles();
  }, [token]);

  const handleLogin = () => {
    const APP_KEY = "nui6rhoasg9k10n";
    const REDIRECT_URI = "https://vinodkumar-kothireddy.github.io/star-app/oauth-callback.html";
    const url = `https://www.dropbox.com/oauth2/authorize?client_id=${APP_KEY}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = url;
  };

  const handleLogout = () => {
    localStorage.removeItem('dropbox_token');
    setToken(null);
    setFiles([]);
    setMetadataMap({});
  };

  const downloadFile = async (path) => {
    try {
      const res = await fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Dropbox-API-Arg': JSON.stringify({ path }),
        },
      });
      if (!res.ok) {
        alert('Failed to download file');
        return;
      }
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = path.split('/').pop();
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      alert('Error downloading file');
    }
  };

  if (!token) {
    return (
      <div className="container">
        <h2>Login to Dropbox</h2>
        <button onClick={handleLogin}>Login with Dropbox</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Your Uploaded Files</h2>
      <button className="logout" onClick={handleLogout}>Logout</button>

      {error && <p className="error">{error}</p>}

      {loading && <p>Loading files...</p>} {/* 🔹 Show while loading */}

      {!loading && !error && files.length === 0 && (
        <p>No files found.</p>  // 🔹 Show only if done loading
      )}

      {!loading && files.length > 0 && (
        <ul>
          {files.map(file => {
            const baseName = file.name.replace(/\.[^.]+$/, '');
            const meta = metadataMap[baseName] || {};
            return (
              <li key={file.id}>
                <strong>{file.name}</strong>
                <div className="metadata">
                  <div><span>Name:</span> {meta.name || '—'}</div>
                  <div><span>Email:</span> {meta.email || '—'}</div>
                  <div><span>Phone:</span> {meta.phone || '—'}</div>
                </div>
                <button onClick={() => downloadFile(file.path_lower)}>Download</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropboxViewer;
