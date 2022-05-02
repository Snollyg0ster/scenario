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

export function download(data: string, filename: string, type: string) {
    let file = new Blob([data], {type: type});
    let a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
}