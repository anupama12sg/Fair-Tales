"use client"

import FileUploader from '../components/ui/FileUploader.jsx';
import WalletConnectButton from '../components/ui/WalletConnectButton.jsx';
import StoryEditor from '../components/ui/StoryEditor.jsx';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to FairTales</h1>
      <WalletConnectButton />
      <FileUploader />
      <StoryEditor />
      
    </main>
  );
}
