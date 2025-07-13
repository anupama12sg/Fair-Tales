import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function StoryEditor({ onPublish }) {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toISOString());
  }, []);

  const handlePublish = () => {
    onPublish({
      title,
      content: markdown,
      timestamp,
    });

    setTitle("");
    setMarkdown("");
    setTimestamp(new Date().toISOString());
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <textarea
        placeholder="Write your story in markdown..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="border p-2 w-full h-40 mb-4"
      />

      <h2 className="text-lg font-semibold">Preview:</h2>
      <div className="border p-2 mb-4 bg-gray-100">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <button
        onClick={handlePublish}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!timestamp}
      >
        Publish
      </button>
    </div>
  );
}