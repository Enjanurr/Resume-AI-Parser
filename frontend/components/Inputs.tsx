'use client'
import { useState, useRef, useEffect } from "react";

const Input = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
 

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setText("");
  };

  const handleTextChange = (e: any) => {
    setText(e.target.value);
    setFile(null);
  };

  const handleSubmit = async () => {
    setError(null);
    setResult(null);

    if (!text && !file) {
      setError("Please paste your resume or upload a file.");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (file) {
        const formData = new FormData();
        formData.append("resume", file);

        response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pdf/`, {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/text/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resume_text: text }),
        });
      }

      if (!response.ok) throw new Error("Failed to parse resume");

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result, error]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Message display */}
     <div className="flex-1 overflow-y-auto px-4 py-6 pb-60 max-w-3xl mx-auto w-full ">
        <h2 className="text-4xl font-semibold mb-6 text-center">Resume Parser Chat</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-4 max-w-lg">
            ❌ {error}
          </div>
        )}

       {result && (
  <div className=" border border-white text-white  p-4 rounded-lg mb-10 whitespace-pre-wrap max-w-4xl break-words">
    ✅ <strong>Parsed Result:</strong>
    <div className="mt-2 text-sm mb-10">
      {result.skills}
      
    </div>
    
  </div>
)}

        
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Input Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t shadow-md z-10 ">
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col gap-3">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your resume content here..."
            rows={2}
            className="w-full resize-none border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!!file}
          />
  <div className="flex items-center justify-center align-center"><p className="text-xl">or</p></div>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            disabled={!!text}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-white file:text-black
              hover:file:bg-gray-200"
          />
  
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-white text-black font-semibold rounded-md transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Parsing..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
