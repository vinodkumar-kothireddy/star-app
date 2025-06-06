import React, { useState } from 'react';
import styles from './UploadPage.module.css';

const UploadPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    file: null,
  });

  const ACCESS_TOKEN = "sl.u.AFzWEoiGAuVh8WLkh9aTS7GcNc0Kfv7BKXa6QI9rG5Kl518QLkNX-h5vNbPO4dhTLkmtcW5W5jB4Lo0jXi6oj1aABDXa3KD4c_lfZB1SdxOeSfeYPto82qskUUynHXBv2QMtz8XDqYju_MIfbFdWcXkKpW92p4uh2zCDY1siYK1X4okpxU0iCFbXkUtv0-HZCLXkLw97HgAJ2AlGjTxbbDqPenzVsRqHs3aSALedpKN7LWYhKBFBogt4DxUGPkC8kAgAHFkz9A6RJyUsC8_tEpDMnFW8TBpJrgfkohqd7lTXhyl6P2FMf6ruQpFmvv6CrREj-SDTAVUIxut6wURd9_0UyI9t9SMctTo_yJW7MzJQlzoOXgIeAntSdfmUqxpLmuMh7oo13N7blt6iNjm5eZ6zPNTlM8RgNR-lKOT8qpm1YMw0U5Flyfka_PhR8roWQM7H7oA0aWC0kzWcfeTlgpAVfdAHQP3nnmi_1017LFY4gN5LIg80PvtfcPCSnkZo8g-N2lkRIZQk2I6Bzk_Rlpi-nd6JAAehGN6AY0m3-uQ9vc58OZISuiJ2nuANaASnWr4ZqlFcS7jcGCyuUVrNotHwzUX0yga_-0crJRAhXxX_EHsY1NH5U9n4Bh352q-FdWZdfo9x3Xd-vpgpAPRXONnwhS81-sjseALcILvgC4y-ZnrtCghNdk9dDeShRAG76WKEbU9rbJOBe-UOZB-IFevJOPdSQzAtpG7geDiMzD3Q9cZZoyHJOscoRo4jr5J6Qzh3EQICbVQ4uCm7mbkIpjtBMv8Zh8dkbUxbhMnUA7_8vHdYbGRXthVHweH7lz03UWVaj7Trfs2NQn8EbuY4HT56ZoBRdegO_V9b1yZZH-zOxrQmar4gsp3_a2IOLaDzDj5MLdVuV0pMgE1qMd8xIeyHAn0B-HGlcXdwBwXM-hs7Yws3ikVQpBXDBshGkl6Re-ocBXPqj8uWqM8IubBHrPXqHPcxuFlbjEMjRFIKI-eEBMXBOrNI-Q7VTdbBULIVIixFnJ-5fuPYMCaNr8flLQUJbAnwA5dRPndiPitvRnoNeImlksG7mG8PQ8GFAv3l1HudfhQEGKNR3Jg4GLh6ztrW2pr_UuGmCUuxT0w1A6a7vswSeW2lLq51KdRGYaQh7oyEc8CGChZARdeleMmk3GlAv3H06poDVGdOMy47l-kEEpGXmG9btfU0pFbGG5W26AYfOqDjmAaey54bGKhw0pRa0Ier6uTUHSABw3tcw4_5VHcHv6lKcSrTi1vAUNXrO8-goKuQ2_yygokQf9dPr3BEw7IQEO3kNctcnmO0n2N6YCfxazYstF2eglcf3bM5hazekb3qWMA_QPhemH4LwwfUU_2FYQh2TxQ-DDzltaY_FYEYa9PUcCT5mCOBQ0cBMNtRkk_eKLkx1zZXV7II_GSs6O8r6VhoiXPB_5VyPpTLqrEPzZ2z1YK9UayG7wknNkw"; // 🔐 Replace securely in production

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === 'file' ? files[0] : value });
  };

  const uploadToDropbox = async (path, contents, isJson = false) => {
    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path,
          mode: 'add',
          autorename: true,
          mute: false,
        }),
      },
      body: contents,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return response.json();
  };

  const handleUpload = async () => {
    const { name, phone, email, file } = formData;

    if (!name || !phone || !email || !file) {
      alert('Please complete all fields.');
      return;
    }

    try {
      const timestamp = Date.now();
      const filePath = `/${timestamp}_${file.name}`;
      const metadataPath = `/${timestamp}_${file.name.replace(/\.\w+$/, '')}_metadata.json`;

      // Upload the file
      await uploadToDropbox(filePath, file);

      // Create and upload metadata
      const metadata = {
        name,
        phone,
        email,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
      };

      const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
        type: 'application/json',
      });

      await uploadToDropbox(metadataPath, metadataBlob, true);

      alert('Upload successful!');
      setFormData({ name: '', phone: '', email: '', file: null });
    } catch (error) {
      console.error(error);
      alert('Upload failed: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Upload Your File</h2>
      <p>Supported formats: .ppt, .pptx, .mp4</p>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="file"
        name="file"
        accept=".ppt,.pptx,.mp4"
        onChange={handleChange}
        className={styles.input}
      />
      <button onClick={handleUpload} className={styles.button}>
        Upload to Dropbox
      </button>
    </div>
  );
};

export default UploadPage;
