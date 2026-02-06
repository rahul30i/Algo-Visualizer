// Bubble Sort repeatedly swaps adjacent elements that are in the wrong order.
// The largest value "bubbles" to the end on each pass.
export const buildBubbleSortSteps = (inputArray) => {
  const steps = [];
  const array = [...inputArray];
  const sortedIndices = new Set();

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    description: "Starting Bubble Sort.",
  });

  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length - i - 1; j += 1) {
      steps.push({
        array: [...array],
        activeIndices: [j, j + 1],
        swappedIndices: [],
        sortedIndices: Array.from(sortedIndices),
        description: `Comparing index ${j} and ${j + 1}.`,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          array: [...array],
          activeIndices: [j, j + 1],
          swappedIndices: [j, j + 1],
          sortedIndices: Array.from(sortedIndices),
          description: `Swapped ${array[j]} and ${array[j + 1]}.`,
        });
      }
    }

    sortedIndices.add(array.length - i - 1);
    steps.push({
      array: [...array],
      activeIndices: [],
      swappedIndices: [],
      sortedIndices: Array.from(sortedIndices),
      description: `Element at index ${array.length - i - 1} is sorted.`,
    });
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: array.length }, (_, index) => index),
    description: "Bubble Sort completed.",
  });

  return steps;
};
