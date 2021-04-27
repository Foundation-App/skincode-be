// const { Router } = require('express');
// const fetch = require('node-fetch');

// //This value will be the dominant color chosen from Clarifai
// // let skinCode = '#cba499';
// // let clarHex = findMe.split('').splice(0, 4).join('').toLowerCase();
// // //This is where HEX should be
// // console.log(clarHex, 'FIND ME HEX!')

// //splitting skincode
// export const transformSkincode = (skinCode) => {
//     let clarHex1 = skinCode.split('').splice(0, 2).toLowerCase();
//     let clarHex2 = skinCode.split('').splice(2, 4).toLowerCase();
//     let clarHex3 = skinCode.split('').splice(4, 6).toLowerCase();

//     let rgbHex1 = parseInt(clarHex1, 16)
//     let rgbHex2 = parseInt(clarHex2, 16)
//     let rgbHex3 = parseInt(clarHex3, 16)

//     return rgbHex1, rgbHex2, rgbHex3

// }

// //splitting j.hex_value // hexvaule
// export const transformMakeupHex = (booger) => {
//     let hex1 = booger.split('').splice(0, 2).toLowerCase();
//     let hex2 = booger.split('').splice(2, 4).toLowerCase();
//     let hex3 = booger.split('').splice(4, 6).toLowerCase();

//     let mRgbHex1 = parseInt(hex1, 16)
//     let mRgbHex2 = parseInt(hex2, 16)
//     let mRgbHex3 = parseInt(hex3, 16)

//     return mRgbHex1, mRgbHex2, mRgbHex3

// }

// //math.pow and determining difference
// export const diffence = (skinCode, booger) => {

// }

// const foundationFetch = (skinCode) => {
//   console.log('hellooo');
//   let clarHex1 = skinCode.split('').splice(0, 2).toLowerCase();
//   let clarHex2 = skinCode.split('').splice(2, 4).toLowerCase();
//   let clarHex3 = skinCode.split('').splice(4, 6).toLowerCase();

//   let rgbHex1 = parseInt(clarHex1, 16)
//   let rgbHex2 = parseInt(clarHex2, 16)
//   let rgbHex3 = parseInt(clarHex3, 16)

//   return fetch(
//     'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation'
//   )
//     .then((res) => res.json())
//     .then((allColor) => {
//       // Loop through the length of the product colors array
//       // check if hex is in Array if so make data object from that hex and then return the object
//       // else return no match
//       let productArr = [];
//       // console.log(allColor)
//       for (let i of allColor) {
//         let name = i.name;
//         let brand = i.brand;
//         let image_link = i.image_link;
//         for (let j of i.product_colors) {
//           const hexVaule = j.hex_value
//             .split('')
//             .splice(0, 4)
//             .join('')
//             .toLowerCase();

//           if (hexVaule === clarHex) {
//             const recommendObj = {
//               name: name,
//               brand: brand,
//               image_link: image_link,
//               hex: j.hex_value,
//               color: j.colour_name,
//             };
//             productArr.push(recommendObj);
//           }
//         }
//       }
//       // console.log(productArr)
//       return productArr;
//     });
// };
// // foundationFetch(skinCode)

// module.exports = {
//   foundationFetch,
// };

//not pushing to an array
const hexDistances = (skinCode, booger) => {
  const difference = cd.compare(skinCode, booger);

  return difference;
};

const sortHexDistances = (hexDistances) => {
  const sortedDifference = hexDistances.sort((a, b) => a - b);
  console.log(sortedDifference);
  return sortedDifference(0, 4);
};
