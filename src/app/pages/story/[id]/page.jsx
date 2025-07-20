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

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterAddress, setCommenterAddress] = useState('0x1234...abcd'); // Replace this with connected wallet if needed

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

  async function handleAddComment() {
    if (!newComment) return;

    const ensName = await resolveENS(commenterAddress);

    const commentData = {
      id: Date.now(),
      text: newComment,
      author: ensName,
    };

    setComments((prev) => [...prev, commentData]);
    setNewComment('');
  }

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

      <div className="prose mb-6">
        <ReactMarkdown>{story.content}</ReactMarkdown>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>

        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="2"
            placeholder="Write your comment..."
          />
          <button
            onClick={handleAddComment}
            className="btn btn-primary btn-sm"
          >
            Add Comment
          </button>
        </div>

        <div>
          {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
          {comments.map((comment) => (
            <div key={comment.id} className="border-b py-2">
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-xs text-gray-500">— {comment.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
