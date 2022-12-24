import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import usePDFMake from "./pdf-defination/usePDFMake";

function App() {
  const [count, setCount] = useState(0);

  const pdfMake = usePDFMake;

  const handleExport = () => {
    pdfMake();
  };

  const handleExportLandscape = () => {
    pdfMake(true);
  };

  return (
    <div className="App">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleExport}
      >
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        Export Pdf (PORTRAIT)
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleExportLandscape}
      >
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        Export Pdf (LANDSCAPE)
      </button>
    </div>
  );
}

export default App;
