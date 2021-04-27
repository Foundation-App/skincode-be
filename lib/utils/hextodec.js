//not pushing to an array
const hexDistances = (skinCode, booger) => {
  const difference = cd.compare(skinCode, booger);

  return difference;
};

const sortHexDistances = (productArr) => {
  const sortedDifference = hexDistances.sort((a, b) => a - b);
  console.log(sortedDifference);
  return sortedDifference(0, 4);
};

const mungedArr = (productArr) => {
  productArr.sort((a, b) => a.hex_distance - b.hex_distance);
};
