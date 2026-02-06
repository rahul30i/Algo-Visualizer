// Linear Search checks each element from left to right until it finds the target.
export const buildLinearSearchSteps = (inputArray, target) => {
  const steps = [];
  const array = [...inputArray];

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    description: `Starting Linear Search for ${target}.`,
  });

  for (let i = 0; i < array.length; i += 1) {
    steps.push({
      array: [...array],
      activeIndices: [i],
      swappedIndices: [],
      sortedIndices: [],
      description: `Checking index ${i}.`,
    });

    if (array[i] === target) {
      steps.push({
        array: [...array],
        activeIndices: [i],
        swappedIndices: [],
        sortedIndices: [i],
        description: `Found ${target} at index ${i}!`,
      });
      return steps;
    }
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    description: `${target} was not found in the array.`,
  });

  return steps;
};
