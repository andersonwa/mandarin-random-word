import React, { useState, useEffect } from "react";

export default function App() {
  const [aula, setAula] = useState(1);
  const [classWords, setClassWords] = useState([]);
  const [tempRandomList, setTempRandomList] = useState([]);
  const [randomLine, setRandomLine] = useState(null);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const getClass = async () => {
    setShowPinyin(false)
    setShowTranslation(false)
    setRandomLine(null)
    await fetch(`${document.location.pathname}/aulas/aula${aula}.txt`)
      .then((res) => res.text())
      .then((text) => {
        const allLines = text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line !== "");


        if (allLines.length === 0) return;
        setTempRandomList(allLines);
        setClassWords(allLines);
      })
      .catch((err) => console.error("Error loading file:", err));
  };

  const getRandomWordFromList = () => {
    setShowPinyin(false)
    setShowTranslation(false)
    const index = Math.floor(Math.random() * tempRandomList.length);
    const tempArray = [...tempRandomList]
    const leftItems = tempArray.splice(index, 1)

    setRandomLine(leftItems[0])
    setTempRandomList(tempArray)

    if (tempArray.length === 0) {
      setTempRandomList(classWords)
    }
  }

  return (
    <div className="@container">
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
            onClick={getClass}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 mb-5"
          >
            Get Class Words
          </button>

          {classWords.length > 0 && <div className="flex gap-5">
            <button
              onClick={getRandomWordFromList}
              className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
            >
              Get Word
            </button>
          </div>}

          {randomLine && (
            <div className="mt-6 text-lg text-gray-800">
              <p><strong>Count:</strong> {tempRandomList.length}</p>
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
              {classWords.map((item, key) => <li key={key}><p>{item}</p></li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}