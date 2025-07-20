'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

async function resolveENS(address) {
  try {
    const ensName = await client.getEnsName({ address });
    return ensName || address;
  } catch (e) {
    return address;
  }
}

export default function StoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [story, setStory] = useState(null);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function fetchStory() {
      try {
        const res = await fetch(`https://gateway.lighthouse.storage/ipfs/${id}`);
        const data = await res.json();
        const ensName = await resolveENS(data.author);

        setStory({ ...data, authorName: ensName });
      } catch (err) {
        console.error('Error fetching story:', err);
      }
    }

    fetchStory();
  }, [id]);

  if (!story) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button onClick={() => router.back()} className="btn btn-outline btn-sm mb-4">
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{story.title}</h1>
      <p className="text-sm text-gray-600 mb-2">Author: {story.authorName}</p>

      <button
        onClick={() => setVotes(votes + 1)}
        className="btn btn-primary btn-sm mb-4"
      >
        👍 Upvote ({votes})
      </button>

      <div className="prose">
        <ReactMarkdown>{story.content}</ReactMarkdown>
      </div>
    </div>
  );
}
