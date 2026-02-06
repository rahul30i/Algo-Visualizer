export default function Controls({
  algorithmOptions,
  selectedAlgorithm,
  onAlgorithmChange,
  arrayInput,
  onArrayInputChange,
  onApplyArray,
  onGenerateRandom,
  speed,
  onSpeedChange,
  errorMessage,
  showTargetInput,
  targetValue,
  onTargetValueChange,
}) {
  return (
    <section className="controls" id="visualizer">
      <div className="controls__header">
        <h2>Controls</h2>
        <p>Enter numbers separated by commas and press “Apply Array”.</p>
      </div>

      <div className="controls__grid">
        <label className="control">
          <span>Algorithm</span>
          <select
            value={selectedAlgorithm}
            onChange={(event) => onAlgorithmChange(event.target.value)}
          >
            {algorithmOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="control control--wide">
          <span>Array Values</span>
          <input
            type="text"
            value={arrayInput}
            onChange={(event) => onArrayInputChange(event.target.value)}
            placeholder="e.g. 5, 2, 9, 1"
          />
        </label>

        {showTargetInput && (
          <label className="control">
            <span>Target Value</span>
            <input
              type="number"
              value={targetValue}
              onChange={(event) => onTargetValueChange(event.target.value)}
            />
          </label>
        )}

        <div className="control control__actions">
          <button
            type="button"
            className="btn"
            onClick={onApplyArray}
            title="Apply the values typed in the array input"
          >
            Apply Array
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onGenerateRandom}
            title="Generate a random array of values"
          >
            Random Array
          </button>
        </div>

        <label className="control">
          <span>Speed: {speed}%</span>
          <input
            type="range"
            min="10"
            max="100"
            value={speed}
            onChange={(event) => onSpeedChange(Number(event.target.value))}
          />
        </label>
      </div>

      {errorMessage && <p className="controls__error">{errorMessage}</p>}
    </section>
  );
}
