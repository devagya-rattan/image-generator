import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setprompt] = useState("");
  const [result, setresult] = useState("");
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateimage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setresult(res.data.data[0].url);
  };
  return (
    <>
      <div>
        <h2>Generate image using Open AI Api</h2>
        <textarea
          placeholder="lets generate image"
          onChange={(e) => setprompt(e.target.value)}
        ></textarea>
        <br />
        <button onClick={generateimage}>Generate</button>
        <hr />
        {result.length > 0 ? <img src={result} alt={result} /> : <p>No Data</p>}
      </div>
    </>
  );
}

export default App;
