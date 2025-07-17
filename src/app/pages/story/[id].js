import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function StoryPage() {
  const router = useRouter();
  const { id } = router.query; // id is CID
  const [story, setStory] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://gateway.lighthouse.storage/ipfs/${id}`)
        .then((res) => res.json())
        .then((data) => setStory(data));
    }
  }, [id]);

  if (!story) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{story.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Author: {story.author}</p>
      <ReactMarkdown>{story.content}</ReactMarkdown>
    </div>
  );
}
