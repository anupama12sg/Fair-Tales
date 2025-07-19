"use client"

import { useState } from "react";
import StoryEditor from "../../components/ui/StoryEditor";
// import uploadToIPFS from "../../lib/uploadToIPFS.js";

export default function WritePage() {
  const [cid, setCid] = useState(null);

  const handlePublish = async (story) => {
    const authorAddress = "0x123..."; // Fetch from connected wallet later
    const data = {
      ...story,
      author: authorAddress,
    };

    try {
      const cid = await uploadToIPFS(data);
      setCid(cid);
      console.log("Story uploaded with CID:", cid);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl p-4 font-bold">Write a Story</h1>
      <StoryEditor onPublish={handlePublish} />
      {cid && (
        <p className="p-4">
          ✅ Story uploaded to IPFS with CID:{" "}
          <a
            href={`https://gateway.lighthouse.storage/ipfs/${cid}`}
            target="_blank"
            className="text-blue-500 underline"
          >
            {cid}
          </a>
        </p>
      )}
    </div>
  );
}
