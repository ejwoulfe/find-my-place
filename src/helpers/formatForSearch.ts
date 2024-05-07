// Possible search queries can be Illinois; Chicago, Illinois; "" or null, incorrect format Chicago, Illinois, USA
export function formatForSearch(query: string) {
  if (query.length === 0 || query === undefined || query === null) {
    throw new Error("Error in search");
  }
  const splitQuery = query.split(",");
  const formattedArray = splitQuery.map((word) => {
    const trimmedWord = word.trim();
    if (trimmedWord.includes(" ")) {
      const splitTrimmedWord = trimmedWord.split(" ");
      return splitTrimmedWord
        .map((word) => {
          return capitalizeFirstLetter(word);
        })
        .join(" ");
    } else {
      return capitalizeFirstLetter(trimmedWord);
    }
  });
  return formattedArray;
}

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}
