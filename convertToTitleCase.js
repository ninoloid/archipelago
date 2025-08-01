const titleCase = (strInput) => {
  return strInput
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

console.log(titleCase("I'm a little tea pot")); // should return "I'm A Little Tea Pot".
console.log(titleCase("sHoRt AnD sToUt")); // should return "Short And Stout".
console.log(titleCase("SHORT AND STOUT")); // should return "Short And Stout".
