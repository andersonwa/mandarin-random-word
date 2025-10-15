import React, { useState, useEffect } from "react";

export default function App() {
  const [aula, setAula] = useState(0);
  const [randomLine, setRandomLine] = useState("");
  const [file, setFile] = useState([]);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const getRandomLine = async () => {
    setShowPinyin(false)
    setShowTranslation(false)
    await fetch(`aulas/aula${aula}.txt`)
      .then((res) => res.text())
      .then((text) => {
        const allLines = text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line !== "");


        if (allLines.length === 0) return;
        setFile(allLines)
        const index = Math.floor(Math.random() * allLines.length);
        setRandomLine(allLines[index]);
      })
      .catch((err) => console.error("Error loading file:", err));
  };

  return (
    <div class="@container">
      <div className="flex flex-col flex md:flex-row sm:flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center w-full justify-center min-h-screen bg-gray-100 text-center p-6 flex-auto">
          <h1 className="text-2xl font-bold mb-4">🎲 Random Line Picker</h1>
          <label>Class Number</label>
          <input 
            className="border border-indigo-600 mb-4 p-3 rounded-lg"
            name="aula" 
            value={aula} 
            onChange={(e)=> setAula(e.target.value)}
          />
          <button
            onClick={getRandomLine}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            Get Random Line
          </button>

          {randomLine && (
            <div className="mt-6 text-lg text-gray-800">
              <strong>Word:</strong> {randomLine.split("=")[0]}
              <p onClick={() => setShowPinyin(!showPinyin)}>
                <strong>Pinyin:</strong> {showPinyin ? randomLine.split("=")[1] : 'Click to show'}
              </p>
              <p onClick={() => setShowTranslation(!showTranslation)}>
                <strong>Translation:</strong> {showTranslation ? randomLine.split("=")[2] : 'Click to show'}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center w-full justify-center min-h-screen p-6 flex-auto">
          <div>
            <ul className="scroll-behavior">
              {file.map((item, key) => <li key={key}><p>{item}</p></li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}