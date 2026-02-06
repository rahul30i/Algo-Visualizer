import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

const getDelayFromSpeed = (speed) => {
  const clamped = Math.min(100, Math.max(10, speed));
  return 1200 - clamped * 10;
};

const colorScale = {
  default: "#4f7cff",
  comparing: "#f5a524",
  swapping: "#ef4444",
  sorted: "#22c55e",
};

export default function Visualizer({ steps, speed }) {
  const svgRef = useRef(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = steps[currentStepIndex] || steps[0];

  const delay = useMemo(() => getDelayFromSpeed(speed), [speed]);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [delay, isPlaying, steps.length]);

  useEffect(() => {
    if (!currentStep || !svgRef.current) return;

    const { array, activeIndices, swappedIndices, sortedIndices } = currentStep;

    const width = 900;
    const height = 320;
    const padding = 32;

    const xScale = d3
      .scaleBand()
      .domain(array.map((_, index) => index))
      .range([padding, width - padding])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(array) || 0])
      .range([height - padding, padding]);

    const svg = d3.select(svgRef.current);
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const bars = svg.selectAll("rect").data(array, (_, index) => index);

    bars
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (_, index) => xScale(index))
            .attr("y", height - padding)
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .attr("rx", 6)
            .attr("fill", colorScale.default)
            .call((selection) =>
              selection
                .transition()
                .duration(delay * 0.6)
                .attr("y", (value) => yScale(value))
                .attr("height", (value) => height - padding - yScale(value))
            ),
        (update) => update,
        (exit) => exit.remove()
      )
      .transition()
      .duration(delay * 0.6)
      .attr("x", (_, index) => xScale(index))
      .attr("width", xScale.bandwidth())
      .attr("y", (value) => yScale(value))
      .attr("height", (value) => height - padding - yScale(value))
      .attr("fill", (_, index) => {
        if (swappedIndices?.includes(index)) return colorScale.swapping;
        if (activeIndices?.includes(index)) return colorScale.comparing;
        if (sortedIndices?.includes(index)) return colorScale.sorted;
        return colorScale.default;
      });

    const labels = svg.selectAll("text").data(array, (_, index) => index);

    labels
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", (_, index) => xScale(index) + xScale.bandwidth() / 2)
            .attr("y", height - padding + 18)
            .attr("fill", "currentColor")
            .attr("font-size", 12)
            .text((value) => value),
        (update) => update,
        (exit) => exit.remove()
      )
      .transition()
      .duration(delay * 0.6)
      .attr("x", (_, index) => xScale(index) + xScale.bandwidth() / 2)
      .attr("y", (value) => yScale(value) - 8)
      .text((value) => value);
  }, [currentStep, delay]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleStepForward = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleStepBackward = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="visualizer">
      <div className="visualizer__header">
        <h2>Visualization</h2>
        <div className="visualizer__buttons">
          <button
            type="button"
            className="btn"
            onClick={() => setIsPlaying((prev) => !prev)}
            title={isPlaying ? "Pause the animation" : "Play the animation"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleReset}
            title="Reset to the first step"
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleStepBackward}
            title="Step backward"
          >
            Step -
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleStepForward}
            title="Step forward"
          >
            Step +
          </button>
        </div>
      </div>

      <div className="visualizer__canvas">
        <svg ref={svgRef} className="visualizer__svg" />
      </div>

      <div className="visualizer__legend">
        <span className="legend legend--comparing">Comparing</span>
        <span className="legend legend--swapping">Swapping</span>
        <span className="legend legend--sorted">Sorted</span>
      </div>

      <div className="visualizer__description">
        <strong>Step {currentStepIndex + 1}</strong>
        <p>{currentStep?.description}</p>
      </div>
    </section>
  );
}
