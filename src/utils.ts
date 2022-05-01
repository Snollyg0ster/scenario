export const getRandomItem = <T>(array: T[]) => array[
    Math.floor(Math.random() * array.length)
];

export const getShuffledArray = <T>(inputArray: T[]) => {
    let array = [...inputArray];
    let currentIndex = array.length;
    let randomIndex = undefined;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }
    return array;
  };