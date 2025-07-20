"use client"

import FileUploader from '../components/ui/FileUploader.jsx';
import WalletConnectButton from '../components/ui/WalletConnectButton.jsx';
import StoryEditor from '../components/ui/StoryEditor.jsx';
import Link from 'next/link';
import { sampleStories } from '../lib/sampleStories';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to FairTales</h1>
      <WalletConnectButton />
      <FileUploader />
      <StoryEditor />
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">📜 FairTales Stories</h1>

        {sampleStories.map((story) => (
          <div key={story.id} className="border-b py-2">
            <Link href={`/pages/story/${story.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {story.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500">By {story.author}</p>
            <p className="text-gray-700">{story.summary}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
