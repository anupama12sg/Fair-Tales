'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// 1. Create Viem public client for ENS resolution
const client = createPublicClient({
    chain: mainnet,
    transport: http(),
});

// 2. ENS resolution function
async function resolveENS(address) {
    try {
        const ensName = await client.getEnsName({ address });
        return ensName || address;
    } catch (e) {
        console.error('ENS resolution error:', e);
        return address;
    }
}

// 3. Main Story Viewer Component
export default function StoryPage() {
    const { id } = useParams(); // `id` = CID from route
    const [story, setStory] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function fetchStory() {
            try {
                const res = await fetch(`https://gateway.lighthouse.storage/ipfs/${id}`);
                const data = await res.json();

                const resolvedName = await resolveENS(data.author);

                setStory({
                    ...data,
                    authorName: resolvedName,
                });
            } catch (err) {
                console.error('Error fetching story:', err);
            }
        }

        // fetchStory();
    }, [id]);

    if (!story) return <p className="p-4">Loading...{id}</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">{story.title}</h1>
            <p className="text-sm text-gray-600 mb-4">
                Author: {story.authorName}
            </p>
            <div className="prose">
                <ReactMarkdown>{story.content}</ReactMarkdown>
                const [votes, setVotes] = useState(0);

                <button onClick={() => setVotes(votes + 1)}>
                    👍 Upvote ({votes})
                </button>
            </div> 
        </div>
    );
}
