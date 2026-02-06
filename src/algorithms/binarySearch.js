// Binary Search repeatedly halves the search range in a sorted array.
// It compares the middle value to decide which half to keep.
export const buildBinarySearchSteps = (inputArray, target) => {
  const steps = [];
  const sortedArray = [...inputArray].sort((a, b) => a - b);

  steps.push({
    array: [...sortedArray],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    description: "Binary Search requires a sorted array. Sorting first.",
  });

  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({
      array: [...sortedArray],
      activeIndices: [left, mid, right],
      swappedIndices: [],
      sortedIndices: [],
      description: `Checking middle index ${mid}.`,
    });

    if (sortedArray[mid] === target) {
      steps.push({
        array: [...sortedArray],
        activeIndices: [mid],
        swappedIndices: [],
        sortedIndices: [mid],
        description: `Found ${target} at index ${mid}!`,
      });
      return steps;
    }

    if (sortedArray[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...sortedArray],
        activeIndices: [left, right],
        swappedIndices: [],
        sortedIndices: [],
        description: `Searching right half (>${sortedArray[mid]}).`,
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...sortedArray],
        activeIndices: [left, right],
        swappedIndices: [],
        sortedIndices: [],
        description: `Searching left half (<${sortedArray[mid]}).`,
      });
    }
  }

  steps.push({
    array: [...sortedArray],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    description: `${target} was not found in the array.`,
  });

  return steps;
};
