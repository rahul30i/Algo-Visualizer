// Selection Sort selects the smallest remaining value and places it in order.
// The sorted region grows from the start of the array.
export const buildSelectionSortSteps = (inputArray) => {
  const steps = [];
  const array = [...inputArray];
  const sortedIndices = new Set();

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    description: "Starting Selection Sort.",
  });

  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j += 1) {
      steps.push({
        array: [...array],
        activeIndices: [minIndex, j],
        swappedIndices: [],
        sortedIndices: Array.from(sortedIndices),
        description: `Comparing current min at index ${minIndex} with index ${j}.`,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...array],
          activeIndices: [minIndex],
          swappedIndices: [],
          sortedIndices: Array.from(sortedIndices),
          description: `New minimum found at index ${minIndex}.`,
        });
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      steps.push({
        array: [...array],
        activeIndices: [i, minIndex],
        swappedIndices: [i, minIndex],
        sortedIndices: Array.from(sortedIndices),
        description: `Swapped index ${i} with min index ${minIndex}.`,
      });
    }

    sortedIndices.add(i);
    steps.push({
      array: [...array],
      activeIndices: [],
      swappedIndices: [],
      sortedIndices: Array.from(sortedIndices),
      description: `Element at index ${i} is in its final position.`,
    });
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: array.length }, (_, index) => index),
    description: "Selection Sort completed.",
  });

  return steps;
};
