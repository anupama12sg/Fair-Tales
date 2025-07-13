import React, { useState } from 'react';
import { uploadToIPFS } from '../../lib/uploadToIPFS';

export default function FileUploader() {
  const [fileUrl, setFileUrl] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const ipfsUrl = await uploadToIPFS(file);
    setFileUrl(ipfsUrl);
  };

  return (
    <div className="p-4 border rounded-md shadow">
      <h2 className="text-xl mb-2">Upload Story or Image</h2>
      <input type="file" onChange={handleUpload} className="mb-2" />
      {fileUrl && (
        <p className="text-sm text-green-600 break-all">
          File uploaded to IPFS: <a href={fileUrl} target="_blank" rel="noreferrer">{fileUrl}</a>
        </p>
      )}
    </div>
  );
}
