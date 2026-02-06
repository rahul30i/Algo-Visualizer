import { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Controls from "./components/Controls.jsx";
import Visualizer from "./components/Visualizer.jsx";
import {
  buildBubbleSortSteps,
  buildSelectionSortSteps,
  buildInsertionSortSteps,
  buildLinearSearchSteps,
  buildBinarySearchSteps,
} from "./algorithms";

const DEFAULT_ARRAY = [5, 1, 9, 3, 7, 2, 8, 6, 4];

const algorithmOptions = [
  { value: "bubble", label: "Bubble Sort" },
  { value: "selection", label: "Selection Sort" },
  { value: "insertion", label: "Insertion Sort" },
  { value: "linear", label: "Linear Search" },
  { value: "binary", label: "Binary Search" },
];

const algorithmToSteps = {
  bubble: buildBubbleSortSteps,
  selection: buildSelectionSortSteps,
  insertion: buildInsertionSortSteps,
  linear: buildLinearSearchSteps,
  binary: buildBinarySearchSteps,
};

const buildRandomArray = (length = 12) =>
  Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);

const parseArrayInput = (raw) =>
  raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number);

export default function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [arrayValues, setArrayValues] = useState(DEFAULT_ARRAY);
  const [arrayInput, setArrayInput] = useState(DEFAULT_ARRAY.join(", "));
  const [targetValue, setTargetValue] = useState("7");
  const [errorMessage, setErrorMessage] = useState("");
  const [speed, setSpeed] = useState(55);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const algorithmSteps = useMemo(() => {
    const builder = algorithmToSteps[selectedAlgorithm];
    return builder(arrayValues, Number(targetValue));
  }, [arrayValues, selectedAlgorithm, targetValue]);

  const handleApplyArray = () => {
    const parsed = parseArrayInput(arrayInput);
    if (!parsed.length || parsed.some((value) => Number.isNaN(value))) {
      setErrorMessage("Please enter a comma-separated list of numbers.");
      return;
    }
    setErrorMessage("");
    setArrayValues(parsed);
  };

  const handleGenerateRandom = () => {
    const randomArray = buildRandomArray();
    setArrayValues(randomArray);
    setArrayInput(randomArray.join(", "));
    setErrorMessage("");
  };

  const handleAlgorithmChange = (value) => {
    setSelectedAlgorithm(value);
    setErrorMessage("");
  };

  const showTargetInput =
    selectedAlgorithm === "linear" || selectedAlgorithm === "binary";

  return (
    <div className={isDarkMode ? "app theme-dark" : "app theme-light"}>
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />

      <main className="main">
        <section className="intro" id="home">
          <h1>Algorithm Visualizer</h1>
          <p>
            Explore classic algorithms through step-by-step animations. Select an
            algorithm, customize the array, and press play to see the logic in
            action.
          </p>
        </section>

        <Controls
          algorithmOptions={algorithmOptions}
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={handleAlgorithmChange}
          arrayInput={arrayInput}
          onArrayInputChange={setArrayInput}
          onApplyArray={handleApplyArray}
          onGenerateRandom={handleGenerateRandom}
          speed={speed}
          onSpeedChange={setSpeed}
          errorMessage={errorMessage}
          showTargetInput={showTargetInput}
          targetValue={targetValue}
          onTargetValueChange={setTargetValue}
        />

        <Visualizer
          steps={algorithmSteps}
          speed={speed}
          key={`${selectedAlgorithm}-${arrayValues.join("-")}-${targetValue}`}
        />

        <section className="intro" id="about">
          <h2>About This Project</h2>
          <p>
            This visualizer is designed for learners. Every algorithm is broken
            into readable steps so you can connect code with visual intuition.
            Try slowing the speed slider and watch how comparisons, swaps, and
            sorted positions evolve.
          </p>
        </section>
      </main>
    </div>
  );
}
