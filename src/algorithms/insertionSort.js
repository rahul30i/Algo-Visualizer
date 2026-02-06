// Insertion Sort grows a sorted prefix by inserting the next element in place.
// It shifts larger values to the right until the correct position is found.
export const buildInsertionSortSteps = (inputArray) => {
  const steps = [];
  const array = [...inputArray];
  const sortedIndices = new Set();

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    description: "Starting Insertion Sort.",
  });

  sortedIndices.add(0);

  for (let i = 1; i < array.length; i += 1) {
    let currentIndex = i;
    while (currentIndex > 0 && array[currentIndex] < array[currentIndex - 1]) {
      steps.push({
        array: [...array],
        activeIndices: [currentIndex, currentIndex - 1],
        swappedIndices: [],
        sortedIndices: Array.from(sortedIndices),
        description: `Compare index ${currentIndex} with ${currentIndex - 1}.`,
      });

      [array[currentIndex], array[currentIndex - 1]] = [
        array[currentIndex - 1],
        array[currentIndex],
      ];

      steps.push({
        array: [...array],
        activeIndices: [currentIndex, currentIndex - 1],
        swappedIndices: [currentIndex, currentIndex - 1],
        sortedIndices: Array.from(sortedIndices),
        description: `Swapped to move ${array[currentIndex - 1]} left.`,
      });

      currentIndex -= 1;
    }

    sortedIndices.add(i);
    steps.push({
      array: [...array],
      activeIndices: [],
      swappedIndices: [],
      sortedIndices: Array.from(sortedIndices),
      description: `Subarray up to index ${i} is sorted.`,
    });
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: Array.from({ length: array.length }, (_, index) => index),
    description: "Insertion Sort completed.",
  });

  return steps;
};
